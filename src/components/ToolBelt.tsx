import * as React from 'react';
import styled from 'styled-components';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImageDataArgs } from 'gatsby-source-sanity';

const StyledBelt = styled.div`
  padding: 20px;
  grid-column: 1/-1;
  text-align: center;
  margin: auto;
  background-color: #111;
  color: #ff8426;
  border-top: 6px solid #ff8426;
  ul {
    padding: 20px 100px;
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    column-gap: 60px;
    row-gap: 50px;
    list-style-type: none;
    @media screen and (max-width: 1200px) {
      grid-template-columns: repeat(10, 1fr);
      column-gap: 20px;
      row-gap: 20px;
    }
    @media screen and (max-width: 800px) {
      grid-template-columns: repeat(5, 1fr);
      column-gap: 20px;
      row-gap: 20px;
      padding: 20px 50px;
    }
  }
`;

interface Node {
  name: string;
  image?: {
    asset: GatsbyImageDataArgs;
  };
  caption?: string;
}

const ToolBelt = () => {
  const { allSanityTools } = useStaticQuery(
    graphql`
      query ToolsQuery {
        allSanityTools {
          nodes {
            name
            image {
              asset {
                gatsbyImageData(width: 400)
              }
            }
          }
        }
      }
    `
  );

  return (
    <StyledBelt>
      <h3>My Toolbelt</h3>
      <ul>
        {allSanityTools.nodes.map((node: any) => {
          let imageData: any;
          if (node.image) {
            imageData = getImage(node.image.asset);
          }
          return (
            <li key={node.name}>
              <GatsbyImage
                title={node.name}
                alt={node.name}
                image={imageData}
              />
            </li>
          );
        })}
      </ul>
    </StyledBelt>
  );
};

export default ToolBelt;
