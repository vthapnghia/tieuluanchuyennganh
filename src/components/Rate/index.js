import "./Rate.scss";

function Rate({ handleGetRate }) {
  return (
    <div className="rate">
      <input
        type="radio"
        id="star5"
        name="rate"
        value="5"
        onChange={handleGetRate(5)}
      />
      <label htmlFor="star5" title="text">
        5 stars
      </label>
      <input
        type="radio"
        id="star4"
        name="rate"
        value="4"
        onChange={handleGetRate(4)}
      />
      <label htmlFor="star4" title="text">
        4 stars
      </label>
      <input
        type="radio"
        id="star3"
        name="rate"
        value="3"
        onChange={handleGetRate(3)}
      />
      <label htmlFor="star3" title="text">
        3 stars
      </label>
      <input
        type="radio"
        id="star2"
        name="rate"
        value="2"
        onChange={handleGetRate(2)}
      />
      <label htmlFor="star2" title="text">
        2 stars
      </label>
      <input
        type="radio"
        id="star1"
        name="rate"
        value="1"
        defaultChecked={true}
      />
      <label htmlFor="star1" title="text">
        1 star
      </label>
    </div>
  );
}

export default Rate;
