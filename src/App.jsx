import React, { useEffect, useState } from "react";
import Spinner from "./components/Spinner";
import { data } from "./data/data";

const App = () => {
  const [images, setImages] = useState(() => []);
  const [urlImages, setUrlImages] = useState(() => []);
  const [captureOnchange, setcaptureOnchange] = useState("");
  const [inputOnchange, setInputOnchange] = useState("");
  const [loading, setLoading] = useState(() => false);

  const handleOnchange = (e) => setcaptureOnchange(e?.target?.value);

  const handleInputOnchange = (e) => setInputOnchange(e?.target?.value);

  const getCategoryHQImage = () => {
    const imageHQ = [...images].map((data) => {
      const getImageHQ = `https://deviants-factions.mo.cloudinary.net/cards/${data.id}.png?tx=h_600,q_80,f_auto`;
      return getImageHQ;
    });

    setUrlImages(imageHQ);
  };

  useEffect(() => {
    setLoading(true);
    const categoryHQ = data.filter((data) => {
      const filterCarType = data.CardType.toLowerCase().includes(
        captureOnchange.toLocaleLowerCase()
      );
      const filterFaction = data.Faction.toLowerCase().includes(
        captureOnchange.toLocaleLowerCase()
      );
      const filterRarity = data.Rarity.toLowerCase().includes(
        captureOnchange.toLocaleLowerCase()
      );

      return filterCarType || filterFaction || filterRarity;
    });

    setTimeout(() => {
      setImages(categoryHQ);
      setLoading(false);
    }, 1500);

    return () => clearTimeout();
  }, [captureOnchange]);

  useEffect(() => {
    setLoading(true);
    const categoryHQ = data.filter((data) => {
      const filterName = data.Name.toLowerCase().includes(
        inputOnchange.toLocaleLowerCase()
      );
      return filterName;
    });

    setTimeout(() => {
      setImages(categoryHQ);
      setLoading(false);
    }, 1500);
  }, [inputOnchange]);

  useEffect(() => {
    getCategoryHQImage();
  }, [images]);

  return (
    <div>
      <div className="app__header">
        <input
          type="text"
          placeholder="Find card"
          value={inputOnchange}
          onChange={handleInputOnchange}
        />
      </div>
      <div className="app__container">
        <aside className="app__aside">
          <div className="app__container--cardType">
            <label className="app__container--label">Card Type</label>
            <select value={captureOnchange} onChange={handleOnchange}>
              <option value="">All Cards</option>
              <option value="HQ">HQ</option>
              <option value="Character">Character</option>
              <option value="Technology">Technology</option>
            </select>
          </div>

          <div className="app__container--cardType">
            <label className="app__container--label">Faction</label>
            <select
              name="factions"
              value={captureOnchange}
              onChange={handleOnchange}
            >
              <option value="Awaken">Awaken</option>
              <option value="Entropy">Entropy</option>
              <option value="Inhuman">Inhuman</option>
              <option value="Owner">Owner</option>
            </select>
          </div>

          <div className="app__container--cardType">
            <label className="app__container--label">Rarity</label>
            <select value={captureOnchange} onChange={handleOnchange}>
              <option value="Legendary">Legendary</option>
              <option value="Rare">Rare</option>
              <option value="Uncommon">Uncommon</option>
              <option value="Common">Common</option>
            </select>
          </div>
        </aside>
        <div className="card__container">
          {loading ? (
            <Spinner></Spinner>
          ) : (
            urlImages.map((data) => (
              <img key={data} src={data} className="card__container--image" />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
