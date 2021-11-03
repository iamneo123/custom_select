function getTemplate(data = [], placeholder) {
    console.log(data);
    const text = placeholder ?? 'Placeholder по умолчанию';
    const items = data.map(item => {
        return `<li class="select__option" data-type="option" data-value="${item.value}">${item.value}</li>`;
    }).join('');

    return `
        <div class="select__backdrop" data-type="backdrop"></div>
        <div class="select__input" data-type="input">
            <div data-type="value">${text}</div>
        </div>
        <div class="select__dropdown">
            <ul class="select__options">
                ${items}
            </ul>
        </div>
        <button class="select__btn" data-type="button"></button>`;
}

class Select {
    constructor(selector, options) {
        this.selectNode = document.querySelector(selector);
        this.buttonNode = this.selectNode.querySelector('button');
        this.options = options;
        this.selectedValue = null;

        this.render();
        this.setup();
    }

    open() {
        this.selectNode.classList.add('open');
    }

    close() {
        this.selectNode.classList.remove('open');
    }

    render() {
        const { data, placeholder } = this.options;
        this.selectNode.classList.add('select');
        this.selectNode.innerHTML = getTemplate(data, placeholder);
    }

    setup() {
        this.clickHandler = this.clickHandler.bind(this);
        this.selectNode.addEventListener('click', this.clickHandler);
        this.valueNode = this.selectNode.querySelector('[data-type="value"]');
    }

    clickHandler(event) {
        const { type } = event.target.dataset;

        console.log(type);

        if (type === 'input' || type === 'button') {
            console.log(1);
            this.toggle();
        } else if (type === 'option') {
            this.select(event.target);
        } else if (type === 'backdrop') {
            this.close();
        }
    }

    get isOpen() {
        return this.selectNode.classList.contains('open');
    }

    toggle() {
        this.isOpen ? this.close() :this.open();
    }

    select(item) {
        const value = item.dataset.value;
        this.selectedValue = value;
        this.valueNode.textContent = value;


        this.highlight(item);

        this.close();
    }

    highlight(item) {
        this.selectNode.querySelectorAll('[data-type="option"]')
            .forEach(item => item.classList.remove('selected'));

        item.classList.add('selected');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const select = new Select('#select', {
        data: [
            {id: '1', value: 'test 1'},
            {id: '2', value: 'test 2'},
            {id: '3', value: 'test 3'},
            {id: '4', value: 'test 4'}
        ],
        placeholder: 'test111'
    });
    window.s = select;
});

