var symbols = [
    {
        "id":0,
        "name":"circle",
	    "description":"it's just a circle",
        "isCharacter":true,
        "construction":
        [
            {"type":"circle", "x":2,"y":2,"r":2}
        ],
        "size":{"width":4,"height":4}
    },
    {
        "id":1,
        "name":"line",
	    "description":"straight and true",
        "isCharacter":true,
        "construction":
        [
            {"type":"line", "x1":0,"y1":4,"x2":4,"y2":0}
        ],
        "size":{"width":4,"height":4}
    },
    {
        "id":2,
        "name":"vee",
	    "description":"it dips a bit in the middle, but you'll get through it",
        "isCharacter":true,
        "construction":
        [
            {"type":"line", "x1":0,"y1":0,"x2":2,"y2":4},
            {"type":"line", "x1":2,"y1":4,"x2":4,"y2":0}
        ],
        "size":{"width":4,"height":4}
    },  
    {
        "id":3,
        "name":"square",
	    "description":"notably not a round",
        "isCharacter":true,
        "construction":
        [
            {"type":"line", "x1":0,"y1":0,"x2":0,"y2":4},
            {"type":"line", "x1":0,"y1":4,"x2":4,"y2":4},
            {"type":"line", "x1":4,"y1":4,"x2":4,"y2":0},
            {"type":"line", "x1":4,"y1":0,"x2":0,"y2":0}
        ],
        "size":{"width":4,"height":4}
    },  
    {
        "id":4,
        "name":"round-box",
	    "description":"the best of circles and squares",
        "isCharacter":true,
        "construction":
        [
            {"type":"quarterCircle", "x":0,"y":0,"orientation":0,"width":1,"height":1},
            {"type":"line", "x1":1,"y1":0,"x2":3,"y2":0},
            {"type":"quarterCircle", "x":3,"y":0,"orientation":3,"width":1,"height":1},
            {"type":"line", "x1":4,"y1":1,"x2":4,"y2":3},
            {"type":"quarterCircle", "x":3,"y":3,"orientation":2,"width":1,"height":1},
            {"type":"line", "x1":1,"y1":4,"x2":3,"y2":4},
            {"type":"quarterCircle", "x":0,"y":3,"orientation":1,"width":1,"height":1},
            {"type":"line", "x1":0,"y1":1,"x2":0,"y2":3}
        ],
        "size":{"width":4,"height":4}
    },  
    {
        "id":5,
        "name":"mug",
	    "description":"for drinking out of",
        "isCharacter":true,
        "construction":
        [
            {"type":"line", "x1":0,"y1":0,"x2":0,"y2":4},
            {"type":"line", "x1":0,"y1":4,"x2":2,"y2":4},
            {"type":"line", "x1":2,"y1":0,"x2":2,"y2":4},
            {"type":"halfCircle", "x":2,"y":1,"orientation":0,"width":1,"height":2}
        ],
        "size":{"width":3,"height":4}
    },
    {
        "id":6,
        "name":"mug in box",
	    "description":"it looks like a delivery of a mug",
        "isCharacter":false,
        "construction":
        [
            {"type":"shape","id":3, "x":0,"y":0, "scale":1},
            {"type":"shape","id":5, "x":1.5,"y":1, "scale":0.5}
        ],
        "size":{"width":3,"height":4}
    },
    {
        "id":7,
        "name":"circle in circle in circle",
	    "description":"it looks like a delivery of a delivery of a ball",
        "isCharacter":false,
        "construction":
        [
            {"type":"shape","id":0, "x":0,"y":0, "scale":1},
            {"type":"shape","id":0, "x":1,"y":1, "scale":0.5},
            {"type":"shape","id":0, "x":1.5,"y":1.5, "scale":0.25}
        ],
        "size":{"width":3,"height":4}
    },
    {
        "id":8,
        "name":"mug in box in circle",
	    "description":"it looks like a delivery of a delivery of a mug",
        "isCharacter":false,
        "construction":
        [
            {"type":"shape","id":0, "x":0,"y":0, "scale":1},
            {"type":"shape","id":6, "x":1,"y":1, "scale":0.5}
        ],
        "size":{"width":3,"height":4}
    },
    {
        "id":9,
        "name":"Swirl",
        "description":"This is a swirl",
        "isCharacter":true,
        "construction":[
            {"type":"quarterCircle","x":2,"y":4,"orientation":3,"width":2,"height":-2},
            {"type":"quarterCircle","x":2,"y":4,"orientation":3,"width":-2,"height":-2},
            {"type":"quarterCircle","x":2.5,"y":1.5,"orientation":3,"width":-0.5,"height":0.5},
            {"type":"quarterCircle","x":2.5,"y":1.5,"orientation":3,"width":0.5,"height":0.5},
            {"type":"quarterCircle","x":2,"y":3,"orientation":3,"width":1,"height":-1},
            {"type":"quarterCircle","x":2,"y":3,"orientation":3,"width":-1,"height":-1},
            {"type":"quarterCircle","x":2.5,"y":0.5,"orientation":3,"width":-1.5,"height":1.5},
            {"type":"quarterCircle","x":2.5,"y":0.5,"orientation":3,"width":1.5,"height":1.5}
        ],
        "size":{"width":0,"height":0}
    }
];