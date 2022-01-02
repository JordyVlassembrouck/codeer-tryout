import React from "react";
import { Tag } from "antd";

export class PokemonTypeTag extends React.Component<{type: string}, {}> {
  constructor(props: any) {
    super(props);
  }

  render() {
    let tagColor = "";
    switch (this.props.type) {
      case "Bug":
        tagColor = "#87950f";
        break;
      case "Dragon":
        tagColor = "#765de2";
        break;
      case "Electric":
        tagColor = "#fcb913";
        break;
      case "Fairy":
        tagColor = "#f3b0f3";
        break;
      case "Fighting":
        tagColor = "#7f2f19";
        break;
      case "Fire":
        tagColor = "#db3006";
        break;
      case "Flying":
        tagColor = "#7b8fe6";
        break;
      case "Ghost":
        tagColor = "#5c5cb0";
        break;
      case "Grass":
        tagColor = "#69be2c";
        break;
      case "Ground":
        tagColor = "#d2b051";
        break;
      case "Ice":
        tagColor = "#91e0fa";
        break;
      case "Normal":
        tagColor = "#b4b4c2";
        break;
      case "Poison":
        tagColor = "#964896";
        break;
      case "Psychic":
        tagColor = "#ea447f";
        break;
      case "Rock":
        tagColor = "#b29a4f";
        break;
      case "Steel":
        tagColor = "#a7a7b6";
        break;
      case "Water":
        tagColor = "#2989e9";
        break;
    }
    return (<Tag color={tagColor}>{this.props.type}</Tag>)
  }
}