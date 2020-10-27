import React from "react";
import { graphql } from "gatsby"
import styled, { css } from "styled-components"
import { Container, Card } from "react-bootstrap";
import Img from "gatsby-image"

import Layout from "../components/layout"
import CenteredContainer from "../components/centeredContainer"
import { darkTheme } from "../components/theme"
import Head from "../components/head"
import NewTabLink from "../components/newTabLink"

// Also change the graphql query
const imageWidth = 200; // px
const imageHeight = 150;// px

const LinksContainer = styled(Container)`
	display: flex;
	flex-wrap: wrap;
	align-items: stretch;
	justify-content: center;
	padding: 0;
`;

const LinkCard = styled(Card)`
	position: relative;
	margin: 1.2rem;
	margin-bottom: 2.5rem;
	border: none;
	border-top: 2px solid ${darkTheme.accentColor};
	${'' /* padding: 0.4rem; */}
	background-color: ${darkTheme.backgroundColor};
	overflow: hidden;
`;

const CardBody = styled(Card.Body)`
	width: ${imageWidth}px;
`;

// CSS Copied from Bootstrap Card
const imageRoundedBorderCSS = css`
	border-radius: calc(0.25rem - 1px);
`;

const CardImage = styled(Img)`
	${imageRoundedBorderCSS}
	width: ${imageWidth}px;
	height: ${imageHeight}px;
`;

//const MISSING_IMAGE_THUMBNAIL = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Cg opacity='.75'%3E%3Cpath d='M19.188 12.001c0 1.1-.891 2.015-1.988 2.015l-4.195-.015c.538 1.088.963 1.999 1.997 1.999h3C19.658 16 21 13.657 21 12s-1.342-4-2.998-4h-3c-1.034 0-1.459.911-1.998 1.999l4.195-.015c1.098 0 1.989.917 1.989 2.017z'/%3E%3Cpath d='M8 12c0 .535.42 1 .938 1h6.109c.518 0 .938-.465.938-1 0-.534-.42-1-.938-1H8.938C8.42 11 8 11.466 8 12z'/%3E%3Cpath d='M4.816 11.999c0-1.1.891-2.015 1.988-2.015L11 9.999C10.461 8.911 10.036 8 9.002 8h-3c-1.656 0-2.998 2.343-2.998 4s1.342 4 2.998 4h3c1.034 0 1.459-.911 1.998-1.999l-4.195.015c-1.098 0-1.989-.917-1.989-2.017z'/%3E%3C/g%3E%3C/svg%3E";
const MISSING_IMAGE_THUMBNAIL = "/img/Icon-Link.svg";

const CardImageMissing = styled.img.attrs(() => ({
	alt: "Link icon for link missing a thumbnail",
	src: MISSING_IMAGE_THUMBNAIL,
	loading: "lazy",
}))`
	${imageRoundedBorderCSS}
	width: 200px;
	height: 100px;
	margin: auto;
`;

export default function Links({ data, location }) {
	return (
		<Layout>
			<Head
				title="Links"
				description="Collection of useful links for Lowell EECS Club."
				pagePath={location.pathname}
			/>
			<CenteredContainer>
				<h1>Links</h1>

				<LinksContainer>
					{data.markdownRemark.frontmatter.links.map((linkPost, index) => {
						return (
							<LinkCard>
								{
									// If post has thumbnail
									linkPost.thumbnail ? 
									(
										linkPost.thumbnail.childImageSharp ?
										<CardImage fixed={linkPost.thumbnail.childImageSharp.fixed} alt={`${linkPost.text} thumbnail`}/>
										:
										// But not an image sharp (svgs, for example, don't generate image sharp
										// Show image directly with simple img tag
										<CardImage as="img" src={linkPost.thumbnail.publicURL} alt={`${linkPost.text} thumbnail`} />
									)
									:
									<CardImage as="div" />
									//<CardImageMissing as="img"/>
								}
								<CardBody>
									<NewTabLink href={linkPost.url} className="stretched-link h5">{linkPost.text}</NewTabLink>
								</CardBody>
							</LinkCard>
						)
					})}
				</LinksContainer>
			</CenteredContainer>
		</Layout>
	);
}

export const query = graphql`
	{
		markdownRemark(fileAbsolutePath: {regex: "/.+/content/links/link.md$/"}) {
			frontmatter {
				links {
					text
					url
					thumbnail {
						childImageSharp {
							fixed (width: 200, height: 150, cropFocus: CENTER, background: "#292f39") {
								...GatsbyImageSharpFixed_withWebp
							}
						}
						publicURL
					}
				}
			}
		}
	}
`;