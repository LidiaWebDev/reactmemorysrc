// imports
import React, { Component } from "react";
import ImageFileNames from "./dogs";
import Navbar from "./components/navbar";
import Banner from "./components/banner";
import ImageBlockListing from "./components/images";
import Footer from "./components/footer";
// component - state
class App extends Component {
  state = {
    imageFileNames: ImageFileNames,
    clickedImages: [],
    score: 0,
    topScore: 0,
    feedback: "Click an image to begin!",
    gameStatus: 0 //gameStatus: 0 => game in progresss, 1 => game won, 2 => game lost
  };
  // componentDidMount
  componentDidMount() {
    this.setState(
      {
        imageFileNames: this.shuffle(this.state.imageFileNames)
      },
      () => {
        console.log("Shuffled the images on game start");
      }
    );
  }
  // handleClick

  handleClick = event => {
    const clickedImageFileName = event.target.alt;

    const wasImageClickedBefore = this.imageClickedBefore(clickedImageFileName);
    if (wasImageClickedBefore) {
      this.setState(
        {
          imageFileNames: this.shuffle(this.state.imageFileNames),

          clickedImages: [],
          score: 0,
          feedback: "Game Over! You clicked this image twice",
          gameStatus: 2
        },
        () => {}
      );
    } else {
      let newScore = this.state.score + 1;
      if (newScore === this.state.imageFileNames.length) {
        this.setState({
          imageFileNames: this.shuffle(this.state.imageFileNames),

          clickedImages: [],
          score: 0,
          topScore: newScore,
          feedback: "CONGRATULATIONS! YOU WON!!!",
          gameStatus: 1
        });
      } else {
        const clickedImagesCopy = this.state.clickedImages.slice();
        clickedImagesCopy.push(clickedImageFileName);
        const newTopScore =
          newScore > this.state.topScore ? newScore : this.state.topScore;
        this.setState(
          {
            imageFileNames: this.shuffle(this.state.imageFileNames),

            clickedImages: clickedImagesCopy,
            score: newScore,
            topScore: newTopScore,
            feedback: "You are doing great! all correct!",
            gameStatus: 0
          },
          () => {}
        );
      }
    }
  };

  imageClickedBefore = clickedImageFileName => {
    for (let index = 0; index < this.state.clickedImages.length; index++) {
      if (this.state.clickedImages[index] === clickedImageFileName) {
        return true;
      }
    }
    return false;
  };

  shuffle = array => {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };

  render() {
    return (
      <div>
        <Navbar
          score={this.state.score}
          topScore={this.state.topScore}
          feedback={this.state.feedback}
          gameStatus={this.state.gameStatus}
        />
        <Banner />
        <ImageBlockListing
          imageFileNames={this.state.imageFileNames}
          clickHandler={this.handleClick}
          gameStatus={this.state.gameStatus}
        />
        <Footer />
      </div>
    );
  }
}

export default App;
