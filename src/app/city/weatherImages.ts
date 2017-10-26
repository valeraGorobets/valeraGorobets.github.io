const className = {
	"Sunny": "Sunny",
	"Clear": "Clear",
	"Breezy": "Breezy",
	"Showers": "Showers",
	"Cloudy": "Cloudy",
	"Partly Cloudy": "PartlyCloudy",
	"Mostly Cloudy": "MostlyCloudy",
	"Snow": "Snow",
	"Snow Showers": "Snow",
};

export default function (weather: string) {
	const defaultImage = "Default";
	return className[weather] || defaultImage;
}