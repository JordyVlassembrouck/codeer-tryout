import React from "react";
import { useParams } from "react-router-dom";
import { Page } from "../components/page";

type RouteProps = {
  id: string;
};

const id = null;
// const { id } = useParams<RouteProps>();

export class PokemonDetail extends React.Component {

  render() {
    return (
      <Page>
        <h1>{id}</h1>;
      </Page>
    );
  }
}