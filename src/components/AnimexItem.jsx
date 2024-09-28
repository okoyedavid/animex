import "./animex.css";

function shortenString(str, maxLength) {
  if (str?.length > maxLength) {
    return str.substring(0, maxLength) + "..."; // Add ellipsis if string is too long
  }
  return str; // Return the original string if it's already short
}

const AnimexItem = ({ item }) => {
  return (
    <li className="anime_list_item">
      <img
        className="img-fluid float-start"
        src={item.images.jpg.image_url}
        alt={item.title}
      />

      <article className="anime_article">
        <span className="airing">{item.status}</span>

        <section>
          <h4 className="article_header">{item.title}</h4>

          <p className="article_synopsis">
            {shortenString(item.synopsis, 300)}{" "}
            <span
              style={{ textDecoration: "underline", color: "#0000EE" }}
              className="Toggle_button"
            >
              Show full
            </span>
          </p>
        </section>

        <p className="released">
          Released on <span>{item.year}</span>
        </p>
      </article>
    </li>
  );
};

export default AnimexItem;
