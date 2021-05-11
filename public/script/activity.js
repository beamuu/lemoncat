const uploadHTML = async (html) => {
    
    // UNUSED //
    // LOCAL // document.getElementById('html-output').innerHTML = html;
    let user = await getUser();
    if (!user) {
        alert('Please sign in.');
        return;
    }
    myDatabase.collection('pageData').doc('public').set({
    homePageHTML: html,
    lastEdit: user.displayName
    });
} 

// support tabs
document.getElementById('html-input').addEventListener('keydown', function(e) {
    if (e.key == 'Tab') {
        e.preventDefault();
          var start = this.selectionStart;
          var end = this.selectionEnd;
  
          // set textarea value to: text before caret + tab + text after caret
          this.value = this.value.substring(0, start) +
            "\t" + this.value.substring(end);
  
          // put caret at right position again
          this.selectionStart =
          this.selectionEnd = start + 1;
    }
});


const convertToHTML = async (text) => {
    
    let user = await getUser();
    var content = '';
    var pointer=0;
    var size = text.length;
    var html = '';

    if (!user) {
        alert('Please sign in.');
        return;
    }
    console.log(text);
    while (text[pointer] != size) {
        if (text[pointer] == '#' && text[pointer+1] == ' ') {
            // main title
            pointer += 2;
            while (pointer != size && text[pointer] != '\n') {
                content += text[pointer];
                pointer++;
            }
            html += `<div class="title" style="display:inline">${content}</div>`;
            content = '';

        }
        else if (text[pointer] == '*' && text[pointer+1] == '*') {
            // bold
            pointer += 2;
            while (pointer != size && !(text[pointer] == '*' && text[pointer+1] == '*')) {
                content += text[pointer];
                pointer++;
            }
            html += `<div class="text-bold" style="display:inline">${content}</div>`;
            content = '';
            pointer+=2;
        }
        else if (text[pointer] == '[') {
            // custom link
            var replace = '';
            var link = '';
            pointer++;
            while (pointer != size && text[pointer] != '|' ) {
                replace += text[pointer];
                pointer++;
            }
            pointer++;
            while (pointer != size && text[pointer] != ']') {
                link += text[pointer];
                pointer++;
            }
            html += `<a class="link" href="${link}" target="_blank">${replace}</a>`;
            content = '';
            pointer++;
        }
        else if (text[pointer] == undefined) break;
        else {
            html += text[pointer];
            pointer++;
        }
    }
    console.log(html);
    myDatabase.collection('pageData').doc('public').set({
        homePageHTML: html,
        homePageText: text,
        lastEdit: user.displayName
    });
}

const callOutTime = () => {

    const timestamp = Date.now();

    const dateObject = new Date(timestamp)

    const humanDateFormat = dateObject.toLocaleString();
    dateObject.toLocaleString("en-US", {weekday: "long"});
    dateObject.toLocaleString("en-US", {month: "long"});
    dateObject.toLocaleString("en-US", {day: "numeric"});
    dateObject.toLocaleString("en-US", {year: "numeric"});
    dateObject.toLocaleString("en-US", {hour: "numeric"});
    dateObject.toLocaleString("en-US", {minute: "numeric"});
    dateObject.toLocaleString("en-US", {second: "numeric"});
    dateObject.toLocaleString("en-US", {timeZoneName: "short"});
    console.log()

}