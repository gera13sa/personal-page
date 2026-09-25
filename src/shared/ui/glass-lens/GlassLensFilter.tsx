type GlassLensFilterProps = {
	id: string;
	mapHref: string;
	scale: number;
};

/** Chromatic edge refraction. Backdrop only; the element's own text stays sharp. */
export function GlassLensFilter({id, mapHref, scale}: GlassLensFilterProps) {
	const red = -(scale - 4);
	const green = -scale;
	const blue = -(scale + 4);

	return (
		<svg className="glass-lens-filter" aria-hidden="true" focusable="false">
			<defs>
				<filter id={id} colorInterpolationFilters="sRGB" x="0%" y="0%" width="100%" height="100%">
					<feImage
						href={mapHref}
						x="0"
						y="0"
						width="100%"
						height="100%"
						preserveAspectRatio="none"
						result="map"
					/>
					<feDisplacementMap in="SourceGraphic" in2="map" scale={red} xChannelSelector="R" yChannelSelector="G" result="dispRed"/>
					<feColorMatrix in="dispRed" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="red"/>
					<feDisplacementMap in="SourceGraphic" in2="map" scale={green} xChannelSelector="R" yChannelSelector="G" result="dispGreen"/>
					<feColorMatrix in="dispGreen" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="green"/>
					<feDisplacementMap in="SourceGraphic" in2="map" scale={blue} xChannelSelector="R" yChannelSelector="G" result="dispBlue"/>
					<feColorMatrix in="dispBlue" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="blue"/>
					<feBlend in="red" in2="green" mode="screen" result="rg"/>
					<feBlend in="rg" in2="blue" mode="screen" result="output"/>
					<feGaussianBlur in="output" stdDeviation="0.6"/>
				</filter>
			</defs>
		</svg>
	);
}
