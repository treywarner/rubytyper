

    var idx=0
    var count=0
    var right=0
    var countdown=0
    var text_elem=document.getElementById("typing_text")
    var text = text_elem.innerHTML
    var highlight = []
    
    var wpm=document.getElementById("wpm")
    var accuracy=document.getElementById("accuracy")

    var start = null
    var game =true
    var rights=[]
$(document.body).on('keydown', function(e) {
    if(e.keyCode == 32) {
        e.preventDefault();
    }
    if (game) {
        if (!start) {
            start=new Date();
        }
        char = e.key;
        if (e.which > 8 && e.which <= 20) {
            
        } else {
        if (e.which == 8) {
            if (idx>0) {
                highlight[idx]=null
                idx--
                countdown++
                if (rights[idx]==true) {
                    right--
                }
                highlight[idx]=null
            }
        } else {

            if (text[idx].toLowerCase() == char.toLowerCase()) {
                rights[idx]=true
                highlight[idx]='green'
                //if (countdown>0) {
                //    countdown--
                //} else {
                    right++
                //}
            } else {
                rights[idx]=false
                highlight[idx]='red'
            }
            
            idx++
        // if (countdown>0) {
            //    countdown--
            //    count+=2
            //} else {
            count++
            //}
        }

        // change color
        var new_text=""
        for (var i=0; i<text.length; i++) {
            if (highlight[i]) {
                if (text[i]==' ' && highlight[i]=='red') {
                    new_text=new_text+"<span style='background-color: "+highlight[i] + ";'>" + text[i] + "</span>"
                
                } else {
                
                    new_text=new_text+"<span style='color: "+highlight[i] + ";'>" + text[i] + "</span>"
                }
            } else {
                new_text=new_text+text[i]
            }
        }
        text_elem.innerHTML=new_text

        //stats
        now = new Date();
        time = now-start;
        wpm_i=Math.round((idx+1)/time*12000*100)/100
        wpm.innerHTML = wpm_i
        acc_i=Math.round((right)/idx*100)+"%"
        accuracy.innerHTML = acc_i

        //colors
        if (wpm.innerHTML>100){
            wpm.innerHTML = "<span style='color: green;'>" + wpm.innerHTML + "</span>"
        } else if (wpm.innerHTML>75){
            wpm.innerHTML = "<span style='color: gold;'>" + wpm.innerHTML + "</span>"
        } else {
            wpm.innerHTML = "<span style='color: red;'>" + wpm.innerHTML + "</span>"
        }
        
        if (Number(accuracy.innerHTML.slice(0,-1))>95){
            accuracy.innerHTML = "<span style='color: green;'>" + accuracy.innerHTML + "</span>"
        } else if (Number(accuracy.innerHTML.slice(0,-1))>75){
            accuracy.innerHTML = "<span style='color: gold;'>" + accuracy.innerHTML + "</span>"
        } else {
            accuracy.innerHTML = "<span style='color: red;'>" + accuracy.innerHTML + "</span>"
        }
    }
    // end
    if (idx==text.length) {
        game = false
        document.getElementById("score").innerHTML = "Congrats! You scored a WPM of "+wpm.innerHTML+" and an accuracy of "+accuracy.innerHTML+"!";
        document.getElementById("score-submit").style.display = "block"
        document.getElementById("info").style.display = "none"
        document.getElementById("wpm-form").value = wpm_i
        document.getElementById("acc-form").value = acc_i
    }
}
});