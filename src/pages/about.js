import React, { useState } from "react"
import { graphql } from "gatsby"
import Container from "react-bootstrap/Container"

import Layout from "../components/layout"
import CenteredContainer from "../components/centeredContainer"
import BoardMemberShowcase, { MemberRow, HorizontalBlockShowcase } from "../components/boardMemberShowcase"
import DebugOptionsBox from "../components/debugOptionsBox"

const pageDesigns = {
	blocks: () => (
		<BoardMemberShowcase />
	),
	leftAlignedBlocks: () => (
		<BoardMemberShowcase justifyContent="flex-start" marginLeft="-1.5rem"/>
	),
	rows: () => (
		<>
			<MemberRow
					name="Bob"
					title="VP of Bob"
					imageSrc="/img/bob.svg"
					description="Bob is such a bob he even the VP of Bob wow such cool."
			/>
			<MemberRow
					name="Bob"
					title="VP of Bob"
					imageSrc="/img/bob.svg"
					description="Bob is such a bob he even the VP of Bob wow such cool."
			/>
			<MemberRow
					name="Bob"
					title="VP of Bob"
					imageSrc="/img/bob.svg"
					description="Bob is such a bob he even the VP of Bob wow such cool."
			/>
			<MemberRow
					name="Bob"
					title="VP of Bob"
					imageSrc="/img/bob.svg"
					description="Bob is such a bob he even the VP of Bob wow such cool."
			/>
		</>
	),
	horizontalBlocks: () => (
		<HorizontalBlockShowcase />
	)
}

export default function About({ data }) {
	const pageDesignEntries = Object.entries(pageDesigns);

	const [useImageBanner, setImageBanner] = useState(false);

	const defaultBoardMemberDesign = "blocks";
	const defaultDesignInvalid = pageDesigns[defaultBoardMemberDesign] === null;

	if (defaultDesignInvalid) {
		console.error("Default board member design is invalid.");
	}

	const [pageDesign, setPageDesign] = useState(defaultDesignInvalid ? pageDesignEntries[0][0] : defaultBoardMemberDesign);
	const BoardMembers = pageDesigns[pageDesign];

	return (
		<Layout>
			<DebugOptionsBox>
				<input id="imageBanner" name="imageBanner" type="checkbox" onChange={() => setImageBanner(!useImageBanner)} />
				<label htmlFor="imageBanner">Image Banner</label>
				<hr></hr>
				{
					pageDesignEntries.map((design, index) => (
						<div key={`pageDesign${design[0]}`}>
							<input key={`pageDesign${design[0]}input`} defaultChecked={pageDesign === design[0] ? true : null} id={`pageDesign${design[0]}`} name="pageDesign" type="radio" onChange={() => setPageDesign(design[0])} />
							<label key={`pageDesign${design[0]}label`} htmlFor={`pageDesign${design[0]}`}>{design[0]}</label>
							<br key={`pageDesign${design[0]}br`}></br>
						</div>
					))
				}
			</DebugOptionsBox>
			<CenteredContainer>
				{
					useImageBanner ? (
						<Container fluid style={{backgroundImage: `url("/img/eecsphoto2-maxwell-xu.jpg")`, backgroundSize: "cover", position: "absolute", left: 0, right: 0}}>
							<Container fluid="lg">
								<h1>About</h1>
							</Container>
						</Container>
					) : (
						<h1>About</h1>
					)
				}
				<div>
				{/*
					Audience: Primarily Lowell students. Secondarily: Parents and the general public
					Make club interesting to students. Keep professional and actually important appeareance
				*/}
					<div>
						<p>
							Lowell Electrical Engineering & Computer Science (EECS) Club is a student-run club at Lowell High School in San Francisco, California.
							Our goal is to inspire students' interest in EECS by providng them exposure to the field.
						</p>
						<p>
							We teach our members how to solder, code, build circuits, and use Arduino microcontrollers through hands-on projects
							creating colorful RGB displays, animated LED cubes, four-legged robots, and much more.
							In addition, we have guest speakers talk about the field and their work.
							All students are welcome regardless of experience. Our workshops will prepare our members to make super cool projects in no time.
						</p>
						<p>
							We meet every Friday from 3:30 to 4:30 pm. Due to the pandemic, our meetings are hosted on Zoom.
							Sign up <a href={data.site.siteMetadata.links.signUpForm}>here. </a>
							<br />
							We hope to see you there!
						</p>
					</div>

					<h2>Officers</h2>
					<BoardMembers />
				</div>
			</CenteredContainer>
		</Layout>
	)
}

export const query = graphql`
	{
		site {
			siteMetadata {
				links {
					signUpForm
				}
			}
		}
	}
`;