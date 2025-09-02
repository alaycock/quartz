---
{"publish":true,"created":"2025-05-31T20:30:07.549-06:00","modified":"2025-09-02T12:09:22.070-06:00","tags":["peak"],"cssclasses":""}
---

Evaluation Error: SyntaxError: Invalid or unexpected token
    at DataviewInlineApi.eval (plugin:dataview:19027:21)
    at evalInContext (plugin:dataview:19028:7)
    at asyncEvalInContext (plugin:dataview:19035:16)
    at DataviewJSRenderer.render (plugin:dataview:19064:19)
    at DataviewJSRenderer.onload (plugin:dataview:18606:14)
    at e.load (app://obsidian.md/app.js:1:1182416)
    at DataviewApi.executeJs (plugin:dataview:19607:18)
    at tryExecuteJs (plugin:quartz-syncer:19764:15)
    at eval (plugin:quartz-syncer:19678:38)
    at eval (plugin:quartz-syncer:20146:54)leaflet\n" + leafletParams;
	text += "marker:\n"
	for (i = 0; i < trips.value.values.length; i++){
		const location = trips.value.values[i];
		text += `  - default, ${location[1]}, ${location[2]}, ${location[0]}\n`;
	}
    text += "```\n";
    dv.paragraph(text);
} else {
    dv.paragraph(trips.error)
}
```

References:
- 

![[Trips.base#Peak attempts]]