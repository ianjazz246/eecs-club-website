import React from "react";
import { graphql } from "gatsby"
import styled from "styled-components"
import { Form, Button } from "react-bootstrap"
import Layout, { CenteredContainer } from "../components/layout";
import { darkTheme } from "../components/theme"

const NoBulletUl = styled.ul`
    list-style-type: none;
	padding: 0;
	margin-left: 0
`;

const FormStyled = styled(Form)`
	border-top: 2px solid var(--primary);
	border-bottom: 2px solid var(--primary);

	.form-control::placeholder {
		color: lightgray;
	}

	input:focus, textarea:focus {
		background-color: ${darkTheme.backgroundColorLighten};
		color: ${darkTheme.textColor};
	}
	input, textarea {
		background-color: ${darkTheme.backgroundColor};
		border-color: black;
		color: ${darkTheme.textColor};
	}
`;

const FormLabelStyled = styled(Form.Label)`
	&::after {
		${(prop) => prop.required ? `
			content: "*";
			color: red;
			` : null
		}
	}
`;

export default function Contact({ data }) {
	const links = data.site.siteMetadata.links;
	return (
		<Layout>
			<CenteredContainer>
				<h1>Contact</h1>
				<p>
					We're always welcome to any feedback or suggestions.
					Contact us through: 
				</p>
				<NoBulletUl>
                    {/* I've read that emails will get scraped and filled with spam, so some captcha/javascript obfuscating should be used.
						Or just a form.	
					<li>Email: <a href={links.email}>lowelleecs@gmail.com</a></li> */}
                    <li>Discord: <a href={links.discord}>Insert Discord Link Here</a></li>
                    <li>Instagram: <a href={links.instagram}>{links.instagramUsername}</a></li>
                </NoBulletUl>
				<p>
					You can also fill out this form.
				</p>
				<FormStyled name="contact" data-netlify="true" action="/success/">
					<Form.Group controlId="formEmail">
						<FormLabelStyled required>Email Address</FormLabelStyled>
						<Form.Control type="email" name="email" placeholder="Enter email" required />
					</Form.Group>
					<Form.Group controlId="formName">
						<FormLabelStyled required>Name</FormLabelStyled>
						<Form.Control type="text" name="name" placeholder="Enter name" required />
					</Form.Group>
					<Form.Group controlId="formMessage">
						<FormLabelStyled>Message</FormLabelStyled>
						<Form.Control as="textarea" name="message" placeholder="Enter your message" />
					</Form.Group>
					<Form.Group>	
						<Button variant="primary" type="submit">Submit</Button>
					</Form.Group>
				</FormStyled>
			</CenteredContainer>
		</Layout>
	);
}

export const query = graphql`
	{
		site {
			siteMetadata {
				links {
					discord
					instagram
					instagramUsername
					email
				}
			}
		}
}
`;