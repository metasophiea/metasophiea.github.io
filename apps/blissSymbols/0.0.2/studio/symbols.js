var symbols = [
    {
        "id":0,
        "name":"circle",
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
        "isCharacter":false,
        "construction":
        [
            {"type":"shape","id":0, "x":0,"y":0, "scale":1},
            {"type":"shape","id":6, "x":1,"y":1, "scale":0.5}
        ],
        "size":{"width":3,"height":4}
    }
];