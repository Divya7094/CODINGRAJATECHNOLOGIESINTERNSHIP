class ResumeEditor {
  constructor(containerId, titleSelector, contentSelector, templateType) {
    this.container = document.getElementById(containerId);
    this.titleSelector = titleSelector;
    this.contentSelector = contentSelector;
    this.templateType = templateType;

    this.editSection = this.editSection.bind(this);
    this.loadSavedContent = this.loadSavedContent.bind(this);

    this.loadSavedContent();

    const editButtons = document.querySelectorAll('.edit-btn');
    editButtons.forEach(button => {
      button.addEventListener('click', () => this.editSection(button.parentNode));
    });
  }

  editSection(element) {
    const contentElement = element.querySelector("h1, h2, h3, p, ul");

    contentElement.contentEditable = "true";
    contentElement.focus();
  }

  loadSavedContent() {
    const savedTitle = localStorage.getItem('resumeTitle');
    const savedContent = localStorage.getItem('resumeContent');

    if (savedTitle) {
      this.container.querySelector(this.titleSelector).textContent = savedTitle;
    }

    if (savedContent) {
      this.container.querySelector(this.contentSelector).innerHTML = savedContent;
    }
  }
}

  