export default {
    install (Vue, options) {
        Vue.directive('loading', {
            bind(el) {        
                const div = makeProgress();

                el.style.position = "relative"
                el.classList.add('loading-container');

                el.appendChild(div)
            },
            update: function (el, binding) {
                if (binding.value !== null) {
                    if (binding.value)
                        el.classList.add('loading');
                    else
                        el.classList.remove('loading');
                }
            }
          })
    }
}

function makeProgress() {
    const div = document.createElement("div");

    div.style.height = "4px"
    div.style.width = "0%"
    div.style.position = "absolute"
    div.style.bottom = "0"
    div.style.left = "0"
    div.style.right = "0"
    div.classList.add('indeterminate-loading')

    return div;
}