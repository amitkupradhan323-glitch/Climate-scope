/**
 * 15 Scientifically Verified Climate Science MCQ Questions
 * Sourced directly from "Our Vibrant Planet" scientific framework,
 * NASA GISTEMP, NOAA GML, and IPCC Assessment Reports.
 */

export const EXAM_QUESTIONS = [
  {
    id: 1,
    category: "Earth's Atmosphere",
    points: 100,
    question: "Over approximately how many years have human industrial activities significantly thickened Earth's atmospheric 'blanket', trapping excess heat?",
    options: [
      { key: "A", text: "Over the last 50 years" },
      { key: "B", text: "Over the last 150 years" },
      { key: "C", text: "Over the last 300 years" },
      { key: "D", text: "Over the last 500 years" }
    ],
    correctAnswer: "B",
    explanation: "Since the onset of large-scale industrialization in the 1850–1900 era (~150 to 175 years ago), fossil fuel combustion has raised atmospheric CO₂ from ~280 ppm to over 426 ppm.",
    pdfPage: "Pages 2 & 3"
  },
  {
    id: 2,
    category: "Planetary Diagnosis",
    points: 100,
    question: "According to the global climate diagnosis, by how much have global surface temperatures risen above pre-industrial levels?",
    options: [
      { key: "A", text: "0.4°C to 0.7°C" },
      { key: "B", text: "1.1°C to 1.47°C" },
      { key: "C", text: "2.1°C to 2.8°C" },
      { key: "D", text: "3.2°C to 4.0°C" }
    ],
    correctAnswer: "B",
    explanation: "Global average surface temperatures have reached 1.1°C to 1.47°C above pre-industrial levels, pressing against critical international warming limits.",
    pdfPage: "Page 2"
  },
  {
    id: 3,
    category: "Baseline & Historical Climatology",
    points: 100,
    question: "Against which historical baseline era do international climate scientists measure current global warming?",
    options: [
      { key: "A", text: "1700–1750 era" },
      { key: "B", text: "1850–1900 era" },
      { key: "C", text: "1920–1940 era" },
      { key: "D", text: "1980–2000 era" }
    ],
    correctAnswer: "B",
    explanation: "The 1850–1900 era is the standard pre-industrial baseline used by the IPCC, NASA, and WMO to evaluate anthropogenic surface temperature anomalies.",
    pdfPage: "Page 2"
  },
  {
    id: 4,
    category: "Recent Temperature Records",
    points: 100,
    question: "Which multi-year period has been identified as the warmest consecutive period in instrumental history?",
    options: [
      { key: "A", text: "1998 to 2002" },
      { key: "B", text: "2010 to 2013" },
      { key: "C", text: "2023 to 2026" },
      { key: "D", text: "2005 to 2008" }
    ],
    correctAnswer: "C",
    explanation: "The last 12 years—and specifically 2023 through 2026—stand as the warmest period on record, breaking all previous multi-year surface and ocean temperature peaks.",
    pdfPage: "Page 2"
  },
  {
    id: 5,
    category: "Greenhouse Mechanism",
    points: 100,
    question: "How do greenhouse gases primarily cause surface warming in Earth's atmosphere?",
    options: [
      { key: "A", text: "By trapping outgoing infrared heat radiating back from Earth's surface" },
      { key: "B", text: "By directly magnifying incoming ultraviolet sunlight from the Sun" },
      { key: "C", text: "By eliminating ozone particles in the upper stratosphere" },
      { key: "D", text: "By cooling the upper thermosphere through condensation" }
    ],
    correctAnswer: "A",
    explanation: "Sunlight warms the ground, which re-radiates heat as infrared energy. Greenhouse gases act like an invisible blanket, absorbing and re-emitting that infrared heat back toward the surface.",
    pdfPage: "Page 3"
  },
  {
    id: 6,
    category: "Global GHG Emissions",
    points: 100,
    question: "In 2025, total human-caused (anthropogenic) greenhouse gas emissions reached which record annual figure?",
    options: [
      { key: "A", text: "22.5 billion tonnes (Gt CO₂eq)" },
      { key: "B", text: "38.2 billion tonnes (Gt CO₂eq)" },
      { key: "C", text: "54.1 billion tonnes (Gt CO₂eq)" },
      { key: "D", text: "78.4 billion tonnes (Gt CO₂eq)" }
    ],
    correctAnswer: "C",
    explanation: "Total annual human-caused greenhouse gas emissions reached a record 54.1 billion tonnes (54.1 Gt CO₂eq) per year in 2025 across all sectors.",
    pdfPage: "Page 4"
  },
  {
    id: 7,
    category: "Agricultural Emissions",
    points: 100,
    question: "Which of the following human activities is the single largest anthropogenic source of atmospheric methane (CH₄)?",
    options: [
      { key: "A", text: "Commercial aviation and marine shipping" },
      { key: "B", text: "Farming and livestock agriculture (enteric fermentation & rice paddies)" },
      { key: "C", text: "Residential wood stoves and fireplaces" },
      { key: "D", text: "Hydropower dam reservoirs" }
    ],
    correctAnswer: "B",
    explanation: "Farming and livestock (specifically cattle enteric fermentation and flooded rice fields) constitute the largest human source of methane, a potent short-lived climate pollutant.",
    pdfPage: "Page 4"
  },
  {
    id: 8,
    category: "The Ocean Thermal Sponge",
    points: 100,
    question: "Approximately what proportion of all excess heat trapped by greenhouse gases has been absorbed by the global oceans?",
    options: [
      { key: "A", text: "About 25%" },
      { key: "B", text: "About 50%" },
      { key: "C", text: "About 70%" },
      { key: "D", text: "Over 90%" }
    ],
    correctAnswer: "D",
    explanation: "Oceans act as Earth's giant thermal sponge, absorbing more than 90% of all excess heat energy trapped by greenhouse gas pollution over the last five decades.",
    pdfPage: "Page 5"
  },
  {
    id: 9,
    category: "Differential Warming Rates",
    points: 100,
    question: "Because oceans absorb the vast majority of heat, how do continental land surface warming rates compare to ocean surfaces?",
    options: [
      { key: "A", text: "Land surfaces are heating up faster (~1.59°C) than ocean surfaces (~0.88°C)" },
      { key: "B", text: "Ocean surfaces have warmed twice as much as continental landmasses" },
      { key: "C", text: "Land and ocean surfaces have warmed at identical rates (+1.0°C)" },
      { key: "D", text: "Land surfaces have cooled while only the equatorial oceans have warmed" }
    ],
    correctAnswer: "A",
    explanation: "Due to lower heat capacity, land surfaces heat up nearly twice as fast as ocean surfaces (warming ~1.59°C compared to ocean surfaces warming ~0.88°C).",
    pdfPage: "Page 5"
  },
  {
    id: 10,
    category: "Cryosphere & Sea Level",
    points: 100,
    question: "Accelerated retreat of mountain glaciers and polar ice sheets in Greenland and Antarctica directly causes which global consequence?",
    options: [
      { key: "A", text: "Pushing global sea levels to unprecedented record highs and shrinking vital polar habitats" },
      { key: "B", text: "Decreasing ocean volume through deep seabed subduction" },
      { key: "C", text: "Permanently stopping polar wind currents" },
      { key: "D", text: "Rapid expansion of Arctic multi-year winter ice pack" }
    ],
    correctAnswer: "A",
    explanation: "Rapid ice sheet melting in Greenland and Antarctica adds billions of tonnes of meltwater to the oceans, pushing global sea levels to record highs and shrinking polar habitats.",
    pdfPage: "Page 7"
  },
  {
    id: 11,
    category: "Marine Ecosystems",
    points: 100,
    question: "What devastating ecological phenomenon occurs when marine heatwaves push ocean waters beyond thermal thresholds?",
    options: [
      { key: "A", text: "Rapid hyper-calcification of mollusk shells" },
      { key: "B", text: "Widespread coral bleaching and biodiversity collapse" },
      { key: "C", text: "Spontaneous desalinization of coastal waters" },
      { key: "D", text: "Massive downward migration of oceanic trenches" }
    ],
    correctAnswer: "B",
    explanation: "Marine heatwaves cause coral polyps to expel their symbiotic zooxanthellae algae, leading to widespread bleaching, starvation, and biodiversity collapse across tropical reefs.",
    pdfPage: "Page 8"
  },
  {
    id: 12,
    category: "Atmospheric Thermodynamics",
    points: 100,
    question: "Under the Clausius-Clapeyron relation, for every 1°C increase in temperature, by approximately how much does the atmosphere's moisture-holding capacity increase?",
    options: [
      { key: "A", text: "About 1%" },
      { key: "B", text: "About 7%" },
      { key: "C", text: "About 25%" },
      { key: "D", text: "About 40%" }
    ],
    correctAnswer: "B",
    explanation: "Warmer air holds ~7% more water vapor per 1°C of warming. This intensifies both evaporative soil drying (droughts) and extreme downpours/floods when moisture condenses.",
    pdfPage: "Page 9"
  },
  {
    id: 13,
    category: "International Climate Policy",
    points: 100,
    question: "Under which international treaty have nearly 200 nations committed to rapid, deep decarbonization and climate finance support?",
    options: [
      { key: "A", text: "The Kyoto Protocol of 1992" },
      { key: "B", text: "The Montreal Protocol of 1987" },
      { key: "C", text: "The Paris Agreement of 2015" },
      { key: "D", text: "The Geneva Environmental Accords" }
    ],
    correctAnswer: "C",
    explanation: "The Paris Agreement legally binds signatories to hold the increase in global average temperature to well below 2°C above pre-industrial levels, pursuing efforts to limit it to 1.5°C.",
    pdfPage: "Page 11"
  },
  {
    id: 14,
    category: "Everyday Climate Superpowers",
    points: 100,
    question: "Which of the following household actions provides an immediate, accessible reduction in fossil fuel electricity and heating demand?",
    options: [
      { key: "A", text: "Switching to LED lighting, managing thermostats, and turning off unused electronics" },
      { key: "B", text: "Running single-dish dishwasher cycles during peak power hours" },
      { key: "C", text: "Replacing double-pane windows with single-pane glass" },
      { key: "D", text: "Installing diesel backup generators for air conditioning" }
    ],
    correctAnswer: "A",
    explanation: "Using less energy at home—through LED bulbs, smart thermostat management, and cutting standby power—is an immediate household climate superpower reducing grid strain.",
    pdfPage: "Page 12"
  },
  {
    id: 15,
    category: "Sustainable Lifestyle Levers",
    points: 100,
    question: "According to the solutions matrix, which combination of individual actions most directly reduces personal oil and agricultural methane footprints?",
    options: [
      { key: "A", text: "Opting for public transit/biking and incorporating more plant-rich meals" },
      { key: "B", text: "Buying imported off-season fruit and flying private jets" },
      { key: "C", text: "Using disposable single-use plastic bottles exclusively" },
      { key: "D", text: "Increasing personal red meat consumption to seven days a week" }
    ],
    correctAnswer: "A",
    explanation: "Choosing public transit, biking, or electric vehicles directly cuts transport petroleum emissions, while eating plant-rich meals significantly reduces agricultural methane emissions.",
    pdfPage: "Pages 13 & 14"
  }
];
