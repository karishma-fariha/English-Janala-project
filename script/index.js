const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(res => res.json())
        .then(json => displayLesson(json.data));
};
const removeActive = () => {
    const lessonBtn = document.querySelectorAll(".lesson-btn");
    lessonBtn.forEach((btn) => btn.classList.remove("active"));
}

const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then(res => res.json())
        .then((data) => {
            removeActive();
            const clickBtn = document.getElementById(`lesson-btn-${id}`);
            clickBtn.classList.add("active");
            displayLevelWord(data.data)
        });
};
const loadWordDetail = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}
` ;
    const res = await fetch(url);
    const details = await res.json();
    displayWordDetails(details.data);
}

const displayWordDetails = (word) => {
    console.log(word);
    const box = document.getElementById("details-container");
    box.innerHTML = `<div class="">
    <h2 class="text-2xl font-bold">${word.word}( <i class="fa-solid fa-microphone-lines"></i>    :${word.pronunciation})</h2>
</div>
<div class="">
    <h2 class="font-bold">Meaning</h2>
    <p class="">${word.meaning}</p>
</div>
<div class="">
    <h2 class="font-bold">Example</h2>
    <p class="">${word.sentence}</p>
</div>
<div class="">
    <h2>synonym</h2>
    <span class="btn">syn1</span>
    <span class="btn">syn2</span>
    <span class="btn">syn3</span>
</div>

    </div>`;
    document.getElementById("word_modal").showModal();

}
const displayLevelWord = (words) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";
    if (words.length == 0) {
        wordContainer.innerHTML = `
         <div class="text-center col-span-full rounded-xl py-10 space-y-6 font-bangla ">
         <img class="mx-auto" src="assets/alert-error.png" alt="">
            <p class="text-xl font-medium text-gray-400 ">
              এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
            </p>
            <h2 class="font-bold text-4xl">নেক্সট Lesson এ যান</h2>
        </div>
         `;
        return;
    }
    words.forEach((word) => {
        console.log(word);
        const card = document.createElement("div");
        card.innerHTML = `<div class="bg-white rounded-xl shadow-sm py-10 px-5 text-center space-y-4">
    <h2 class="font-bold text-2xl">${word.word ? word.word : "word not found"}</h2>
    <p class="font-semibold ">Meaning /Pronounciation</p>
    <div class="text-2xl font-bangla font-medium">${word.meaning ? word.meaning : "meaning not found"}/${word.pronunciation ? word.pronunciation : "pronunciation not found"}</div>
    <div class=" flex justify-between items-center ">
        <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info "></i></button>
    
        <button class="btn  bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
    </div>
</div>`;

        wordContainer.append(card);
    });
};



const displayLesson = (lessons) => {
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";



    for (let lesson of lessons) {


        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = ` <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
                         <i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}
                        </button>`;

        levelContainer.append(btnDiv)

    }

};

loadLessons();