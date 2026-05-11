

document.getElementById("searchBtn").addEventListener("click", function () {
    let term = document.getElementById("searchBar").value.trim().toLowerCase();
    if (!term) return;

   
    document.querySelectorAll(".highlight").forEach(el => {
        el.classList.remove("highlight");
    });

  
    let bodyText = document.body.innerHTML.toLowerCase();
    let index = bodyText.indexOf(term);

    if (index === -1) {
        alert("No matches found");
        return;
    }

    
    let range = document.createRange();
    let selection = window.getSelection();
    selection.removeAllRanges();

    function findText(node) {
        if (node.nodeType === 3) {
            let pos = node.data.toLowerCase().indexOf(term);
            if (pos !== -1) {
                range.setStart(node, pos);
                range.setEnd(node, pos + term.length);
                selection.addRange(range);
                return true;
            }
        } else {
            for (let child of node.childNodes) {
                if (findText(child)) return true;
            }
        }
        return false;
    }

    findText(document.body);

    
});




