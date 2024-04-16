const reviewWrap = document.getElementById("reviewWrap");
const leftArrow = document.getElementById("leftArrow");
const rightArrow = document.getElementById("rightArrow");
const imgDiv = document.getElementById("imgDiv");
const personName = document.getElementById("personName");
const profession = document.getElementById("profession");
const description = document.getElementById("description");
const surpriseMeBtn = document.getElementById("surpriseMeBtn");
const chicken = document.querySelector(".chicken");

let isChickenVisible;

let people = [
	
		
	{
		photo:
			"url('https://media.istockphoto.com/id/1186131704/photo/female-photographer-photographing-with-digital-camera.jpg?s=1024x1024&w=is&k=20&c=62I-SlLJ0I5yrb3ql4j4xM7qmOrMrDTvHHWz-62DOAM=')",
		name: "Priya Patel",
		profession: "Mumbai, India",
		description:
        "Radhe's expertise and passion for wildlife made our trip to the Desert National Park truly memorable. His knowledge of the area and the wildlife was impressive. We saw rare species of birds and mammals that we wouldn't have spotted without him. Highly recommended!"
	},

	{
		photo:
			"url('https://media.istockphoto.com/id/1838005425/photo/cheerful-laughing-climber-in-sunglasses-portrait-with-backpack-ascending-mera-peak-high.jpg?s=1024x1024&w=is&k=20&c=hc8Jm-jogTL-CRvU0XYS9MQuznJBWT_BaNTuSef74_U=')",
		name: "David Smith",
		profession: "New York, USA",
		description:
        "I had the pleasure of exploring the Thar Desert with Radhe as my guide, and it was an experience I'll never forget. His dedication to conservation and his deep understanding of the desert ecosystem added so much value to our trip. His photography skills are exceptional too!"
	},

	{
		photo:
			"url('https://cdn.pixabay.com/photo/2014/10/30/17/32/boy-509488_960_720.jpg')",
		name:  "Sarah Johnson",
		profession: "London, UK",
		description:
        "Radhe is not just a guide; he's a storyteller. His narratives about the desert and its inhabitants were captivating. He showed us the beauty of the Great Indian Bustard and taught us about its conservation. Our trip with Radhe was both educational and adventurous!"
	}, 
    {
		photo:
	"url('https://cdn.pixabay.com/photo/2019/09/22/17/59/dharmendra-rai-4496641_1280.jpg')",
		name: "Rajesh Kumar",
		profession: "Delhi, India",
		description:
        "I've been on many wildlife tours, but none compared to the experience I had with Radhe. His enthusiasm for the desert and its wildlife is infectious. He took us on thrilling safaris and shared his extensive knowledge about the flora and fauna. A fantastic guide for anyone visiting the Desert National Park!"
	}
];

imgDiv.style.backgroundImage = people[0].photo;
personName.innerText = people[0].name;
profession.innerText = people[0].profession;
description.innerText = people[0].description;
let currentPerson = 0;

//Select the side where you want to slide
function slide(whichSide, personNumber) {
	let reviewWrapWidth = reviewWrap.offsetWidth + "px";
	let descriptionHeight = description.offsetHeight + "px";
	//(+ or -)
	let side1symbol = whichSide === "left" ? "" : "-";
	let side2symbol = whichSide === "left" ? "-" : "";

	let tl = gsap.timeline();

	if (isChickenVisible) {
		tl.to(chicken, {
			duration: 0.4,
			opacity: 0
		});
	}

	tl.to(reviewWrap, {
		duration: 0.4,
		opacity: 0,
		translateX: `${side1symbol + reviewWrapWidth}`
	});

	tl.to(reviewWrap, {
		duration: 0,
		translateX: `${side2symbol + reviewWrapWidth}`
	});

	setTimeout(() => {
		imgDiv.style.backgroundImage = people[personNumber].photo;
	}, 400);
	setTimeout(() => {
		description.style.height = descriptionHeight;
	}, 400);
	setTimeout(() => {
		personName.innerText = people[personNumber].name;
	}, 400);
	setTimeout(() => {
		profession.innerText = people[personNumber].profession;
	}, 400);
	setTimeout(() => {
		description.innerText = people[personNumber].description;
	}, 400);

	tl.to(reviewWrap, {
		duration: 0.4,
		opacity: 1,
		translateX: 0
	});

	if (isChickenVisible) {
		tl.to(chicken, {
			duration: 0.4,
			opacity: 1
		});
	}
}

function setNextCardLeft() {
	if (currentPerson === 3) {
		currentPerson = 0;
		slide("left", currentPerson);
	} else {
		currentPerson++;
	}

	slide("left", currentPerson);
}

function setNextCardRight() {
	if (currentPerson === 0) {
		currentPerson = 3;
		slide("right", currentPerson);
	} else {
		currentPerson--;
	}

	slide("right", currentPerson);
}

leftArrow.addEventListener("click", setNextCardLeft);
rightArrow.addEventListener("click", setNextCardRight);

surpriseMeBtn.addEventListener("click", () => {
	if (chicken.style.opacity === "0") {
		chicken.style.opacity = "1";
		imgDiv.classList.add("move-head");
		surpriseMeBtn.innerText = "Remove the chicken";
		surpriseMeBtn.classList.remove("surprise-me-btn");
		surpriseMeBtn.classList.add("hide-chicken-btn");
		isChickenVisible = true;
	} else if (chicken.style.opacity === "1") {
		chicken.style.opacity = "0";
		imgDiv.classList.remove("move-head");
		surpriseMeBtn.innerText = "Surprise me";
		surpriseMeBtn.classList.add("surprise-me-btn");
		surpriseMeBtn.classList.remove("hide-chicken-btn");
		isChickenVisible = false;
	}
});

window.addEventListener("resize", () => {
	description.style.height = "100%";
});
