import "./animex.css";

const AnimexItem = ({ item }) => {
  console.log(item);
  return (
    <li className="anime_list_item">
      <img
        className="img-fluid float-start"
        src={item.images.jpg.image_url}
        alt={item.title}
        loading="lazy"
      />

      <article className="anime_article">
        <span className="airing">{item.status}</span>

        <section>
          <h4 className="article_header">{item.title_english}</h4>

          {/* <p>{item.synopsis}</p> */}
        </section>

        <p className="released">
          Released on <span>14th October 2021</span>
        </p>
      </article>
    </li>
  );
};

export default AnimexItem;
