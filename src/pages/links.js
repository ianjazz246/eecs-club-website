import React from "react";
import { graphql } from "gatsby"
import styled, { css } from "styled-components"
import Layout from "../components/layout"
import CenteredContainer from "../components/centeredContainer"
import { Container, Card } from "react-bootstrap";
import Img from "gatsby-image"
import * as path from "path"
import { darkTheme } from "../components/theme"

const UlStyled = styled.ul`
	font-size: 1.5rem;
`;

// const LinkButton = styled(Button)`
// 	margin: 0.5rem;
// `;

const LinksContainer = styled(Container)`
	display: flex;
	flex-wrap: wrap;
	align-items: stretch;
	justify-content: center;
`;

const LinkCard = styled(Card)`
	width: 200px;
	margin: 1rem;
	background-color: ${darkTheme.backgroundColor};
`;

const CardBody = styled(Card.Body)`
	${'' /* min-height: 6rem; */}
`;

const imageBorderCSS = css`
	border-top-left-radius: calc(0.25rem - 1px);
	border-top-right-radius: calc(0.25rem - 1px);
`;

const CardImage = styled(Img)`
	${imageBorderCSS}
`;

//const MISSING_IMAGE_THUMBNAIL = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Cg opacity='.75'%3E%3Cpath d='M19.188 12.001c0 1.1-.891 2.015-1.988 2.015l-4.195-.015c.538 1.088.963 1.999 1.997 1.999h3C19.658 16 21 13.657 21 12s-1.342-4-2.998-4h-3c-1.034 0-1.459.911-1.998 1.999l4.195-.015c1.098 0 1.989.917 1.989 2.017z'/%3E%3Cpath d='M8 12c0 .535.42 1 .938 1h6.109c.518 0 .938-.465.938-1 0-.534-.42-1-.938-1H8.938C8.42 11 8 11.466 8 12z'/%3E%3Cpath d='M4.816 11.999c0-1.1.891-2.015 1.988-2.015L11 9.999C10.461 8.911 10.036 8 9.002 8h-3c-1.656 0-2.998 2.343-2.998 4s1.342 4 2.998 4h3c1.034 0 1.459-.911 1.998-1.999l-4.195.015c-1.098 0-1.989-.917-1.989-2.017z'/%3E%3C/g%3E%3C/svg%3E";
const MISSING_IMAGE_THUMBNAIL = "/img/Icon-Link.svg";

const CardImageMissing = styled.img.attrs(() => ({
	alt: "Link icon for link missing a thumbnail",
	src: MISSING_IMAGE_THUMBNAIL,
	loading: "lazy",
}))`
	${imageBorderCSS}
	width: 200px;
	height: 100px;
	margin: auto;
`;

const LinksContainerGrid = styled.div`
	display: grid;

	grid-gap: 1rem;
	grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
`;


export default function Links({ data }) {
	return (
		<Layout>
			<CenteredContainer>
				<h1>Links</h1>

				<LinksContainer>
					{data.markdownRemark.frontmatter.links.map((linkPost, index) => {

						return (
							<LinkCard>
								{
									linkPost.thumbnail ? 
										<CardImage fixed={linkPost.thumbnail.childImageSharp.fixed} alt={`${linkPost.text} thumbnail`}/> :
										<CardImageMissing as="img"/>
								}
								<CardBody>
									<Card.Title>
										<a href={linkPost.url} target="_blank" rel="noopener noreferrer" className="stretched-link">{linkPost.text}</a>
									</Card.Title>
								</CardBody>
							</LinkCard>
						)
					})}
				</LinksContainer>
				<LinksContainerGrid>
				{data.markdownRemark.frontmatter.links.map((linkPost, index) => {
					return (
						<LinkCard>
							{
								linkPost.thumbnail ? 
									<CardImage fixed={linkPost.thumbnail.childImageSharp.fixed} alt={`${linkPost.text} thumbnail`}/> :
									<CardImageMissing as="img"/>
							}
							<CardBody>
								<Card.Title>
									<a href={linkPost.url} target="_blank" rel="noopener noreferrer" className="stretched-link">{linkPost.text}</a>
								</Card.Title>
							</CardBody>
						</LinkCard>
					)
					})}
				</LinksContainerGrid>

				{/* <UlStyled>
				{
					data.markdownRemark.frontmatter.links.map((link, index) => {
						return (<li key={index}>
							<a
								key={index}
								href={link.url}
								target="_blank"
								rel="noopener noreferrer" // Possible phishing vulnerability if target="_blank" and these rel properties aren't set
							>
								{link.text}
							</a>
						</li>)
					})
				}
				</UlStyled> */}
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
							fixed (width: 200, height: 100) {
								...GatsbyImageSharpFixed_withWebp
							}
						}
					}
				}
			}
		}
	}
`;