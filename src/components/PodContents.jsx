import { useEffect, useState } from "react";
import { getSolidDataset, getThingAll, getUrlAll } from "@inrupt/solid-client";
import PropTypes from "prop-types";

const PodContents = ({ session }) => {
  const [podContents, setPodContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(
    "You need to log in to view your Pod contents."
  );

  useEffect(() => {
    // if (!session.info.isLoggedIn) return;

    const fetchPodContents = async () => {
      try {
        setLoading(true);
        setError("");

        if (!session.info.isLoggedIn) {
          setError("You need to log in to view your Pod contents.");
          setLoading(false);
          return;
        }

        const podUrl = session.info.webId.replace("profile/card#me", "");

        const solidDataset = await getSolidDataset(podUrl, {
          fetch: session.fetch,
        });
        // console.log("solidDataset", solidDataset);

        const allThings = getThingAll(solidDataset);
        // console.log("allThings", allThings);

        const contents = allThings.map((thing) => {
          // console.log("url", url);
          return {
            url: thing.url,
            titles: getUrlAll(thing, "http://purl.org/dc/terms/title"),
          };
        });
        // console.log("contents", contents);

        setPodContents(contents);
        setError("");
      } catch (err) {
        console.error("Error fetching Pod contents:", err);
        setError("Failed to load contents. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPodContents();
  }, [session]);

  return (
    <div className="podContentsContainer">
      {loading && <p>Loading Pod contents...</p>}
      {error && (
        <p
        // style={{ color: "red" }}
        >
          {error}
        </p>
      )}
      {!loading && (
        <ul className="contentsList">
          {podContents.length === 0 ? (
            <p>No contents found in your Pod.</p>
          ) : (
            podContents.map((content, index) => (
              <li key={index} className="contentsListItem">
                <a href={content.url} target="_blank" rel="noopener noreferrer">
                  {content.titles[0] || content.url}
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
