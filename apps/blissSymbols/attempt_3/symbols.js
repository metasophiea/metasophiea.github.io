var symbols = [
    {
        "id":0,
        "name":"line",
        "isCharacter":true,
        "construction":
        [
            {"type":"circle", "x":2,"y":2,"r":2}
        ]
    },
    {
        "id":1,
        "name":"line",
        "isCharacter":true,
        "construction":
        [
            {"type":"line", "x1":0,"y1":4,"x2":4,"y2":0}
        ]
    },
    {
        "id":2,
        "name":"vee",
        "isCharacter":true,
        "construction":
        [
            {"type":"line", "x1":0,"y1":0,"x2":2,"y2":4},
            {"type":"line", "x1":2,"y1":4,"x2":4,"y2":0}
        ]
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
        ]
    },  
    {
        "id":4,
        "name":"round-box",
        "isCharacter":true,
        "construction":
        [
            {"type":"quart", "x":0,"y":0,"orientation":0,"width":1,"height":1},
            {"type":"line", "x1":1,"y1":0,"x2":3,"y2":0},
            {"type":"quart", "x":3,"y":0,"orientation":3,"width":1,"height":1},
            {"type":"line", "x1":4,"y1":1,"x2":4,"y2":3},
            {"type":"quart", "x":3,"y":3,"orientation":2,"width":1,"height":1},
            {"type":"line", "x1":1,"y1":4,"x2":3,"y2":4},
            {"type":"quart", "x":0,"y":3,"orientation":1,"width":1,"height":1},
            {"type":"line", "x1":0,"y1":1,"x2":0,"y2":3}
        ]
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
            {"type":"quart", "x":2,"y":1,"orientation":3,"width":1,"height":1},
            {"type":"quart", "x":2,"y":2,"orientation":2,"width":1,"height":1}
        ]
    }
];