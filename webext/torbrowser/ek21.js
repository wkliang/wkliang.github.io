console.log('ek21.js BEGIN');
function postUrl(url, obj, cb) {
	var xhr = new XMLHttpRequest();
	xhr.onload = () => cb(xhr.responseText);
	xhr.open('POST', url);
	var formData = new FormData();
	Object.keys(obj).forEach((k) => formData.append(k, obj[k]));
	xhr.send(formData);
}
function login(nick,pass) {
	postUrl("/login?r=0.9876543210987654",
		{roomid:roomid, nickname:nick, password:pass, gender:my_gender},
		function(data) {
			console.log(data);
			eval(data.match(/my_cserial.*/)[0]);
			eval(data.match(/my_nickname.*/)[0]);
		});
};
function relogin(nick,pass) {
	postUrl("/logout",
		{roomid:roomid, logout_url:"", cserial:my_cserial, launch:""},
		function() {
			login(nick ? nick : my_nickname.substring(3),
				pass ? pass : "");
		});
};
adwm_post = function() { showmsg("adwm_post"); }
adver_wait = function() { showmsg("adver_wait"); }
adver1_wait = function() { showmsg("adver1_wait"); }
dirty_filter = function(s) { return s; }
function online_find_nickname(str) {
	for(var i=0; i<online.length; i++) {
		online[i].icon = "";
		if(online[i].nickname==str) return i;
	}
	return -1;
}
function msg_area() {
this.frames['ma'].document.close();
this.frames['ma'].document.open();
with(this.frames['ma'].document) {
writeln("<HTML><HEAD>");
writeln("    <meta http-equiv='Content-Type' content='text/html; charset=big5'>");
writeln("    <meta http-equiv='Content-Language' content='zh-tw'>");
writeln("    <style type='text/css'>");
writeln("    p {");
writeln("        line-height: 1.0;");
writeln("        margin: 0 0 3px 0;");
writeln("    }");
writeln("    table {");
writeln("        margin-bottom: 3px;");
writeln("        border: 1px solid #999999;");
writeln("    }");
writeln("    #ad {");
writeln("        margin-bottom: 3px;");
writeln("    }");
writeln("    A:link {");
writeln("        text-decoration: none;");
writeln("    }");
writeln("    A:visited {");
writeln("        text-decoration: none;");
writeln("    }");
writeln("    A:active {");
writeln("        text-decoration: none;");
writeln("    }");
writeln("    A:hover {");
writeln("        text-decoration: underline;");
writeln("    }");
writeln("    .bar {");
writeln("        font-family: 新細明體;");
writeln("        font-size: 12pt;");
writeln("    }");
writeln("    td {");
writeln("        font-family: 新細明體;");
writeln("        font-size: 11pt;");
writeln("    }");
writeln("    body {");
writeln("        font-family: 新細明體;");
writeln("        font-size: 11pt;");
writeln("        overflow-x: hidden;");
writeln("        margin: 0px;");
writeln("    }");
writeln("    .adver {");
writeln("        font-size: 11pt;");
writeln("        font-weight: bold;");
writeln("        color: #FFFF00;");
writeln("        line-height: 20pt;");
writeln("    }");
writeln("    </style>");
writeln("    <script language=\"javascript\">");
writeln("    document.writeln(\"<base href='\" + parent.serverbase + \"'>\");");
writeln("    function vshow_alert(m) {");
writeln("        parent.vshow_alert(m);");
writeln("    }");
writeln("    function vshow_shownote(m) {");
writeln("        parent.vshow_shownote(m);");
writeln("    }");
writeln("    function vshow_showtime(t) {");
writeln("        parent.vshow_showtime(t);");
writeln("    }");
writeln("    function vshow_div(i) {");
writeln("        parent.vshow_div(i);");
writeln("    }");
writeln("    function vshow_newmsg(nick, gender, m) {");
writeln("        parent.vshow_newmsg(nick, gender, m);");
writeln("    }");
writeln("    <"+"/"+"script>");
writeln("</HEAD>");
writeln("");
writeln("<body bgcolor='#000000' text='#FFFFFF' bgproperties='fixed' topmargin='0' leftmargin='0' oncontextmenu=\"return(false)\">");
writeln("<div id=\"main\" style=\"margin:0px;padding:0px;width:100%;height:100%;overflow:auto;overflow-x:hidden;word-break:break-all;\">");
writeln("</div></body></html>");
}
	var mamain = this.frames['ma'].document.getElementById('main');
	if(!mamain) return;
	mamain.innerHTML = ""; 
	showmsg(parent.roomid +", "+ parent.my_cserial +", "+ 
		parent.my_level +", "+ parent.my_nickname +", "+ parent.my_gender);
	screen_lines = 1;
}
function online_area() {
var sy = online_scroll_y();
this.frames['oa'].document.open();
with(this.frames['oa'].document) {
writeln("<HTML><HEAD>");
writeln("<meta http-equiv=\"Content-Type\" content=\"text/html; charset=big5\">");
writeln("<meta http-equiv=\"Content-Language\" content=\"zh-tw\">");
writeln("<style type=\"text/css\">");
writeln("td { font-size: 10pt; }");
writeln("tr { line-height: 1.2; }");
writeln("A:link, A:visited, A:active { text-decoration: none; }");
writeln("</style>");
writeln("<script language=\"javascript\">document.writeln(\"<base href='\"+parent.serverbase+\"'>\");<"+"/"+"script>");
writeln("</HEAD>");
writeln("<body bgcolor='#000000' text='ffcc00' bgproperties='fixed' topmargin='0' leftmargin='0'>");
writeln("<basefont size=2 face='新細明體'>");
writeln("<div align='center'>");
writeln("<script language=\"JavaScript\">");
writeln("function gcolor(gender) { return (gender=='girl') ? parent.girlcolor : parent.boycolor; }");
writeln("function openbook(uno) { window.open('http://board.ek21.com/board?uno='+uno, '_book', ''); }");
writeln("document.writeln(parent.online_prefix);");
writeln("document.writeln(\"<table border='0' cellpadding='0' cellspacing='0' width='100%' align='center'>\");");
writeln("for(var i=0; i<parent.online.length; i++) {");
writeln("	var u = parent.online[i];");
writeln("	document.write(\"<tr><td align='center' width='30'>\");");
writeln("	if(u.icon!='') document.write(\"<img border='0' width='28' height='28' src='/icon/\"+u.icon+\"'>\");");
writeln("	document.write(\"</td>\");");
writeln("	document.write(\"<td><a href=\\\"javascript:parent.sel('\"+u.nickname+\"','\"+u.gender+\"')\\\" target='ta'\");");
writeln("	if(u.uno>0) document.write(\" ondblclick='openbook(\"+u.uno+\")'\");");
writeln("	document.write(\">\");");
writeln("	document.write(\"<font color='\"+gcolor(u.gender)+\"'>\"+u.nickname+\"</font></a>\");");
writeln("	if(u.level!='') document.write(\" \"+u.level);");
writeln("	document.write(\"</td>\");");
writeln("	document.writeln(\"</tr>\");");
writeln("}");
writeln("document.writeln(\"</table>\");");
writeln("document.writeln(parent.online_append);");
writeln("document.write(\"<table border='0' cellspacing='1' cellpadding='0' align='center' width='100%' style='margin-top:10px;margin-bottom:8px;'><tr><td height='18' align='center'>\");");
writeln("document.write(\"<font color='\"+gcolor('boy')+\"'>♂\"+parent.online_boy_count()+\"人</font> \");");
writeln("document.write(\"<font color='\"+gcolor('girl')+\"'>♀\"+parent.online_girl_count()+\"人</font></td></tr>\");");
writeln("document.write(\"<tr><td align='center' height='18'><font color='#00FF00'>總人數 \"+parent.online_count()+\" 人</font></td></tr>\");");
writeln("document.write(\"<tr><td align='center' height='18'><font color='#00FF00'>本室容量 \"+parent.maxuser+\" 人</font></td></tr>\");");
writeln("document.write(\"<tr><td align='center' height='18'><font color='#FFCC00'>室別: \"+parent.roomid+\"</font></td></tr>\");");
writeln("document.write(\"</table>\");");
writeln("<"+"/"+"script>");
writeln("</BODY></HTML>");
}
this.frames['oa'].document.close();
this.frames['oa'].scrollTo(0, sy);

this.frames['ta'].form1.onsubmit = function() {
	var says_temp = frames.ta.document.form1.says_temp.value;
	if(frames.ta.document.form1.st.checked)
		says_temp = frames.ta.s2t(says_temp);
	frames.ta.document.form1.cserial.value = parent.my_cserial;
	frames.ta.document.form1.msgno.value = parent.my_msgno;
	frames.ta.document.form1.to_nickname.value = parent.to_nickname_select;
	frames.ta.document.form1.to_gender.value = parent.to_gender_select;
	frames.ta.document.form1.says.value = says_temp;
	frames.ta.document.form1.says_temp.value = '';
	frames.ta.says_keep_add(says_temp);
	frames.ta.says_last = says_temp;
	frames.ta.says_lasttime = frames.ta.nowsecm();
	parent.msg_stat(0);
	parent.says_focus();
	frames.ta.document.form1.sayscount.value = ++frames.ta.says_count;
	return true;
}
this.frames['ta'].form1.color.selectedIndex = 0;
this.frames['ta'].form1.background.selectedIndex = 0;
}
console.log('ek21.js END');
