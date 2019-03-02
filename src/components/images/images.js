import React from "react";
import "./images.css";
import ImageBlock from "../imageDiv";

const ImageBlockListing = props => (
  <div className="container">
    <div className="row">
      {props.imageFileNames.map((imageFileName, index) => {
        return (
          <ImageBlock
            key={index}
            imageFileName={imageFileName}
            alt={imageFileName}
            clickHandler={props.clickHandler}
            gameStatus={props.gameStatus}
          />
        );
      })}
    </div>
  </div>
);

export default ImageBlockListing;
