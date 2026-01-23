"use strict";

const aCourse = {
  code: "CSE121b",
  name: "Javascript Language",
  sections: [
    { sectionNum: 1, roomNum: "STC 353", enrolled: 26, days: "TTh", instructor: "Bro T" },
    { sectionNum: 2, roomNum: "STC 347", enrolled: 28, days: "TTh", instructor: "Sis A" }
  ],
  enrollStudent(sectionNum) {
    const normalized = String(sectionNum).trim();

    if (!/^\d+$/.test(normalized)) {
      return { ok: false, message: "1 또는 2 같은 숫자를 입력하세요." };
    }

    const sectionIndex = this.sections.findIndex(
      (section) => String(section.sectionNum) === normalized
    );

    if (sectionIndex < 0) {
      return { ok: false, message: `${normalized} 섹션을 찾을 수 없어요.` };
    }

    this.sections[sectionIndex].enrolled += 1;
    return { ok: true, message: `${normalized} 섹션에 1명 등록 완료.` };
  }
};

function setHeader(course) {
  document.querySelector("#courseName").textContent = course.name;
  document.querySelector("#courseCode").textContent = course.code;
}

function sectionTemplate(section) {
  return `
    <tr>
      <td>${section.sectionNum}</td>
      <td>${section.roomNum}</td>
      <td>${section.enrolled}</td>
      <td>${section.days}</td>
      <td>${section.instructor}</td>
    </tr>
  `;
}

function renderSections(sections) {
  document.querySelector("#sections").innerHTML = sections.map(sectionTemplate).join("");
}

function setMessage(text, state) {
  const el = document.querySelector("#formMessage");
  el.textContent = text || "";
  if (state) el.setAttribute("data-state", state);
  else el.removeAttribute("data-state");
}

function clearMessageSoon(ms = 2400) {
  window.setTimeout(() => setMessage("", ""), ms);
}

function wireUpEnrollment(course) {
  const form = document.querySelector("#enrollForm");
  const input = document.querySelector("#sectionNumber");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const result = course.enrollStudent(input.value);

    if (!result.ok) {
      setMessage(result.message, "error");
      input.focus();
      input.select();
      return;
    }

    renderSections(course.sections);
    setMessage(result.message, "ok");
    clearMessageSoon();
    input.value = "";
    input.focus();
  });
}

setHeader(aCourse);
renderSections(aCourse.sections);
wireUpEnrollment(aCourse);