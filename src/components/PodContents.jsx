import { useEffect, useState } from "react";
import {
  getSolidDataset,
  getThing,
  getThingAll,
  getUrlAll,
} from "@inrupt/solid-client";
import PropTypes from "prop-types";

const PodContents = ({ session }) => {
  const [podContents, setPodContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPodContents = async () => {
      try {
        setLoading(true);

        if (!session.info.isLoggedIn) {
          setError("You need to log in to view your Pod contents.");
          setLoading(false);
          return;
        }

        const podUrl = session.info.webId.replace("profile/card#me", "");

        const solidDataset = await getSolidDataset(podUrl, {
          fetch: session.fetch,
        });
        console.log(solidDataset);

        const allThings = getThingAll(solidDataset);
        console.log("allThings", allThings);

        const contents = allThings.map((thing) => {
          const url = getThing(solidDataset, thing.url);
          console.log("url", url);
          return {
            url: thing.url,
            titles: getUrlAll(url, "http://purl.org/dc/terms/title"),
          };
        });
        console.log("contents", contents);

        setPodContents(contents);
        setError("");
      } catch (err) {
        console.error(err);
        setError("Failed to load contents. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPodContents();
  }, [session]);

  return (
    <div>
      {loading && <p>Loading Pod contents...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && (
        <ul>
          {podContents.length === 0 ? (
            <p>No contents found in your Pod.</p>
          ) : (
            podContents.map((content, index) => (
              <li key={index}>
                <a href={content.url} target="_blank" rel="noopener noreferrer">
                  {/* {content.titles[0] || content.url} */}
                  {content}
                </a>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

PodContents.propTypes = {
  session: PropTypes.object.isRequired,
};

export default PodContents;
