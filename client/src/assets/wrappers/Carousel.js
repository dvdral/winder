import styled from "styled-components"

const CarouselStyled = styled.div`
	width: ${props => props.width || "100%"};
	height: ${props => props.height || "100%"};
	position: relative;
	border-radius: 1rem;
	background: rgb(2, 0, 36);

	display: flex;
	flex-direction: column;

	.carousel-items {
		position: relative;
		width: inherit;
		height: inherit;
	}

	.carousel-item {
		position: absolute;
		inset: 0;
		opacity: 0;
		width: 100%;
		height: 100%;
		object-fit: contain;
		object-position: center;
		transition: opacity 400ms ease-in-out;
	}

	.carousel-item.active {
		opacity: 1;
	}

	.carousel-control {
		position: absolute;
		z-index: 1;
		top: 50%;
		transform: translateY(-50%);
		width: 20%;
		height: 45%;
	}

	.carousel-control--right {
		right: 0px;
	}

	.carousel-control--left {
		left: 0px;
	}

	.carousel-control:hover {
		background-color: rgba(0, 0, 0, 0.03);
	}

	.carousel-control > .control-icon {
		z-index: 1;
		display: none;
		position: absolute;
	}

	.carousel-control--left > .control-icon {
		left: 0px;
	}

	.carousel-control--right > .control-icon {
		right: 0px;
	}

	.carousel-control:hover > .control-icon {
		display: block;
	}

	.header {
		width: 100%;
		position: absolute;
		top: 0px;
	}

	.indicator {
		position: absolute;
		top: 0px;
		width: 100%;
	}

	.indicator-btn {
		background-color: #646464;
		border-radius: 0%;
		width: calc((100% / ${props => props.len}) - 2px);
		height: 3px;
		margin: 1px;
	}

	.indicator-btn--active {
		position: relative;
		background-color: white;
	}

	.context-menu{
		position: absolute;
		top: 2rem;
		width: 100%;
	}
	.name{
		display: flex;
		align-items: center;
		gap: 1em;
		font-size: 1.5em;
		background: -webkit-linear-gradient(#ff3c00, #d53a9d);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;

		margin: 1em;
	}
	.name > .age{
		display: flex;
		align-items: center;
		gap: 1em;
	}
`

export default CarouselStyled
