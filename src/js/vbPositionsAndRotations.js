// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

class VBTutorial {
    NS = 'http://www.w3.org/2000/svg'

    constructor(config, heightScaleFactor, courtScaleFactor) {
        const svgWidth = (typeof config.width === 'number') ? config.width : 900
        this.svg = {
            width: svgWidth,
            height: svgWidth * heightScaleFactor,
            scale: svgWidth * courtScaleFactor
        }
        console.log(`drawing ${this.svg.width} by ${this.svg.height}`)
        this.colours = {
            backgroundColour: (config.colours && typeof config.colours.backgroundColour === 'string') ? config.colours.backgroundColour : '#63b6e0',
            courtColour: (config.colours && typeof config.colours.courtColour === 'string') ? config.colours.courtColour : '#ffb591',
            lineColour: (config.colours && typeof config.colours.lineColour === 'string') ? config.colours.lineColour : 'white',
            playerOutlineColour: (config.colours && typeof config.colours.playerOutlineColour === 'string') ? config.colours.playerOutlineColour : '#f5f5f5',
            playerColour: (config.colours && typeof config.colours.playerColour === 'string') ? config.colours.playerColour : '#efa581',
            playerColourHighlight: (config.colours && typeof config.colours.playerColourHighlight === 'string') ? config.colours.playerColourHighlight : '#66dd66',
            tutorialColour: (config.colours && typeof config.colours.tutorialColour === 'string') ? config.colours.tutorialColour : '#7ec485',
            tutorialFade: (config.colours && typeof config.colours.tutorialFade === 'string') ? config.colours.tutorialFade : '#999999',
        }
        this.svg.svgRoot = document.createElementNS(this.NS, 'svg')
        this.svg.svgRoot.setAttribute('width', this.svg.width)
        this.svg.svgRoot.setAttribute('height', this.svg.height)
        this.svg.snapRoot = Snap(this.svg.svgRoot)
    }

    getSVG() {
        return this.svg.svgRoot
    }
}

class VBPositionsAndRotation extends VBTutorial {
    /*
    * We want to use the same internal units as the court itself, which is 1100 units wide
    * and our tutorial will be 1700x1600 units, so we will have a scaling factor of
    * {image-width} / 1700, and we allow the court to be (11/17) of our width.
    *
    * The image itself defaults to 900px wide, with the height being set to 16/17 * {width}
    * We could use a transformation, but I'd rather have the final SVG to be "clean"
    */

    constructor(config) {
        super(config, (16 / 17), (1 / 1700))
        this.svg.rotationControlCirleRadius = this.svg.width * (24 / 1700)

        this.colours.rotationControlColour = (config.colours && typeof config.colours.rotationControlColour === 'string') ? config.colours.rotationControlColour : '#ffffff'
        this.colours.rotationControlHighlightColour = (config.colours && typeof config.colours.rotationControlHighlightColour === 'string') ? config.colours.rotationControlHighlightColour : '#dddddd'
        this.colours.rotationControlBackgroundColourA = (config.colours && typeof config.colours.rotationControlBackgroundColourA === 'string') ? config.colours.rotationControlBackgroundColourA : '#65b6df'
        this.colours.rotationControlBackgroundColourB = (config.colours && typeof config.colours.rotationControlBackgroundColourB === 'string') ? config.colours.rotationControlBackgroundColourB : '#4596bf'

        this.text = {
            'it': {
                players: {s: 'P', o: 'O', m2: 'C2', m1: 'C1', h1: 'S1', h2: 'S2', l: 'L'},
                rotationControl: {
                    serving: 'Servizio',
                    receiving: 'Ricezione',
                    s1: 'P1',
                    s2: 'P2',
                    s3: 'P3',
                    s4: 'P4',
                    s5: 'P5',
                    s6: 'P6'
                },
                actionControl: {
                    servingBase: 'Base',
                    serve: 'Servizio',
                    set: 'Alzata',
                    switch: 'Cambio',
                    pass: 'Ricezione',
                    attack: 'Attacco'
                },
            },
        }

        this.language = 'it'

        let startPosition = 1;
        this.court = new VBHalfCourt({
            width: (11 / 17) * this.svg.width
        })

        this.svg.snapRoot.append(this.court.getSVG())
        this.court.getSVG().setAttribute('transform', 't100,0')

        this.playerPositions = {
            servingBase: {
                1: {
                    s: {x: 700, y: 600},
                    h1: {x: 700, y: 100},
                    m2: {x: 450, y: 100},
                    o: {x: 200, y: 100},
                    h2: {x: 200, y: 600},
                    l: {x: 450, y: 700},
                    m1: {x: -64, y: 700}
                },
                2: {
                    m1: {x: 700, y: 600},
                    s: {x: 700, y: 100},
                    h1: {x: 450, y: 100},
                    m2: {x: 200, y: 100},
                    o: {x: 200, y: 600},
                    h2: {x: 450, y: 700},
                    l: {x: -64, y: 700}
                },
                3: {
                    h2: {x: 700, y: 600},
                    m1: {x: 700, y: 100},
                    s: {x: 450, y: 100},
                    h1: {x: 200, y: 100},
                    l: {x: 200, y: 600},
                    o: {x: 450, y: 700},
                    m2: {x: -64, y: 700}
                },
                4: {
                    o: {x: 700, y: 600},
                    h2: {x: 700, y: 100},
                    m1: {x: 450, y: 100},
                    s: {x: 200, y: 100},
                    h1: {x: 200, y: 600},
                    l: {x: 450, y: 700},
                    m2: {x: -64, y: 700}
                },
                5: {
                    m2: {x: 700, y: 600},
                    o: {x: 700, y: 100},
                    h2: {x: 450, y: 100},
                    m1: {x: 200, y: 100},
                    s: {x: 200, y: 600},
                    h1: {x: 450, y: 700},
                    l: {x: -64, y: 700}
                },
                6: {
                    h1: {x: 700, y: 600},
                    m2: {x: 700, y: 100},
                    o: {x: 450, y: 100},
                    h2: {x: 200, y: 100},
                    l: {x: 200, y: 600},
                    s: {x: 450, y: 700},
                    m1: {x: -64, y: 700}
                }
            },
            servingServe: {
                1: {
                    s: {x: 700, y: 940},
                    h1: {x: 580, y: 100},
                    m2: {x: 450, y: 100},
                    o: {x: 320, y: 100},
                    h2: {x: 200, y: 600},
                    l: {x: 450, y: 700},
                    m1: {x: -64, y: 700}
                },
                2: {
                    m1: {x: 700, y: 940},
                    s: {x: 580, y: 100},
                    h1: {x: 450, y: 100},
                    m2: {x: 320, y: 100},
                    o: {x: 200, y: 600},
                    h2: {x: 450, y: 700},
                    l: {x: -64, y: 700}
                },
                3: {
                    h2: {x: 700, y: 940},
                    m1: {x: 580, y: 100},
                    s: {x: 450, y: 100},
                    h1: {x: 320, y: 100},
                    l: {x: 200, y: 600},
                    o: {x: 450, y: 700},
                    m2: {x: -64, y: 700}
                },
                4: {
                    o: {x: 700, y: 940},
                    h2: {x: 580, y: 100},
                    m1: {x: 450, y: 100},
                    s: {x: 320, y: 100},
                    h1: {x: 200, y: 600},
                    l: {x: 450, y: 700},
                    m2: {x: -64, y: 700}
                },
                5: {
                    m2: {x: 700, y: 940},
                    o: {x: 580, y: 100},
                    h2: {x: 450, y: 100},
                    m1: {x: 320, y: 100},
                    s: {x: 200, y: 600},
                    h1: {x: 450, y: 700},
                    l: {x: -64, y: 700}
                },
                6: {
                    h1: {x: 700, y: 940},
                    m2: {x: 580, y: 100},
                    o: {x: 450, y: 100},
                    h2: {x: 320, y: 100},
                    l: {x: 200, y: 600},
                    s: {x: 450, y: 700},
                    m1: {x: -64, y: 700}
                }
            },
            servingSwitch: {
                1: {
                    s: {x: 700, y: 600},
                    h1: {x: 200, y: 100},
                    m2: {x: 450, y: 100},
                    o: {x: 700, y: 100},
                    h2: {x: 450, y: 700},
                    l: {x: 200, y: 600},
                    m1: {x: -64, y: 700}
                },
                2: {
                    m1: {x: 200, y: 600},
                    s: {x: 700, y: 100},
                    h1: {x: 200, y: 100},
                    m2: {x: 450, y: 100},
                    o: {x: 700, y: 600},
                    h2: {x: 450, y: 700},
                    l: {x: -64, y: 700}
                },
                3: {
                    h2: {x: 450, y: 700},
                    m1: {x: 450, y: 100},
                    s: {x: 700, y: 100},
                    h1: {x: 200, y: 100},
                    l: {x: 200, y: 600},
                    o: {x: 700, y: 600},
                    m2: {x: -64, y: 700}
                },
                4: {
                    o: {x: 700, y: 600},
                    h2: {x: 200, y: 100},
                    m1: {x: 450, y: 100},
                    s: {x: 700, y: 100},
                    h1: {x: 450, y: 700},
                    l: {x: 200, y: 600},
                    m2: {x: -64, y: 700}
                },
                5: {
                    m2: {x: 200, y: 600},
                    o: {x: 700, y: 100},
                    h2: {x: 200, y: 100},
                    m1: {x: 450, y: 100},
                    s: {x: 700, y: 600},
                    h1: {x: 450, y: 700},
                    l: {x: -64, y: 700}
                },
                6: {
                    h1: {x: 450, y: 700},
                    m2: {x: 450, y: 100},
                    o: {x: 700, y: 100},
                    h2: {x: 200, y: 100},
                    l: {x: 200, y: 600},
                    s: {x: 700, y: 600},
                    m1: {x: -64, y: 700}
                }
            },
            receivingBase: {
                1: {
                    s: {x: 700, y: 600},
                    h1: {x: 700, y: 100},
                    m2: {x: 450, y: 100},
                    o: {x: 200, y: 100},
                    h2: {x: 200, y: 600},
                    l: {x: 450, y: 700},
                    m1: {x: -64, y: 700}
                },
                2: {
                    l: {x: 700, y: 600},
                    s: {x: 700, y: 100},
                    h1: {x: 450, y: 100},
                    m2: {x: 200, y: 100},
                    o: {x: 200, y: 600},
                    h2: {x: 450, y: 700},
                    m1: {x: -64, y: 700}
                },
                3: {
                    h2: {x: 700, y: 600},
                    m1: {x: 700, y: 100},
                    s: {x: 450, y: 100},
                    h1: {x: 200, y: 100},
                    l: {x: 200, y: 600},
                    o: {x: 450, y: 700},
                    m2: {x: -64, y: 700}
                },
                4: {
                    o: {x: 700, y: 600},
                    h2: {x: 700, y: 100},
                    m1: {x: 450, y: 100},
                    s: {x: 200, y: 100},
                    h1: {x: 200, y: 600},
                    l: {x: 450, y: 700},
                    m2: {x: -64, y: 700}
                },
                5: {
                    l: {x: 700, y: 600},
                    o: {x: 700, y: 100},
                    h2: {x: 450, y: 100},
                    m1: {x: 200, y: 100},
                    s: {x: 200, y: 600},
                    h1: {x: 450, y: 700},
                    m2: {x: -64, y: 700}
                },
                6: {
                    h1: {x: 700, y: 600},
                    m2: {x: 700, y: 100},
                    o: {x: 450, y: 100},
                    h2: {x: 200, y: 100},
                    l: {x: 200, y: 600},
                    s: {x: 450, y: 700},
                    m1: {x: -64, y: 700}
                }
            },
            receivingPass: {
                1: {
                    s: {x: 840, y: 700},
                    h1: {x: 700, y: 600},
                    m2: {x: 150, y: 60},
                    o: {x: 54, y: 100},
                    h2: {x: 200, y: 600},
                    l: {x: 450, y: 700},
                    m1: {x: -64, y: 700}
                },
                2: {
                    l: {x: 700, y: 600},
                    s: {x: 700, y: 100},
                    h1: {x: 200, y: 600},
                    m2: {x: 40, y: 160},
                    o: {x: 260, y: 840},
                    h2: {x: 450, y: 700},
                    m1: {x: -64, y: 700}
                },
                3: {
                    h2: {x: 700, y: 600},
                    m1: {x: 740, y: 140},
                    s: {x: 600, y: 100},
                    h1: {x: 200, y: 600},
                    l: {x: 450, y: 700},
                    o: {x: 560, y: 820},
                    m2: {x: -64, y: 700}
                },
                4: {
                    o: {x: 760, y: 820},
                    h2: {x: 200, y: 600},
                    m1: {x: 140, y: 140},
                    s: {x: 60, y: 60},
                    h1: {x: 450, y: 700},
                    l: {x: 700, y: 600},
                    m2: {x: -64, y: 700}
                },
                5: {
                    l: {x: 700, y: 600},
                    o: {x: 840, y: 100},
                    h2: {x: 200, y: 600},
                    m1: {x: 60, y: 60},
                    s: {x: 350, y: 140},
                    h1: {x: 450, y: 700},
                    m2: {x: -64, y: 700}
                },
                6: {
                    h1: {x: 700, y: 600},
                    m2: {x: 700, y: 140},
                    o: {x: 560, y: 60},
                    h2: {x: 200, y: 600},
                    l: {x: 450, y: 700},
                    s: {x: 510, y: 170},
                    m1: {x: -64, y: 700}
                }
            },
            receivingSet: {
                1: {
                    s: {x: 600, y: 100},
                    h1: {x: 900, y: 300},
                    m2: {x: 450, y: 300},
                    o: {x: 0, y: 300},
                    h2: {x: 450, y: 600},
                    l: {x: 400, y: 700},
                    m1: {x: -64, y: 700}
                },
                2: {
                    l: {x: 700, y: 600},
                    s: {x: 600, y: 100},
                    h1: {x: 0, y: 300},
                    m2: {x: 450, y: 300},
                    o: {x: 850, y: 600},
                    h2: {x: 430, y: 600},
                    m1: {x: -64, y: 700}
                },
                3: {
                    h2: {x: 450, y: 600},
                    m1: {x: 450, y: 300},
                    s: {x: 600, y: 100},
                    h1: {x: 0, y: 300},
                    l: {x: 400, y: 700},
                    o: {x: 850, y: 600},
                    m2: {x: -64, y: 700}
                },
                4: {
                    o: {x: 850, y: 600},
                    h2: {x: 0, y: 300},
                    m1: {x: 450, y: 300},
                    s: {x: 600, y: 100},
                    h1: {x: 450, y: 700},
                    l: {x: 700, y: 600},
                    m2: {x: -64, y: 700}
                },
                5: {
                    l: {x: 700, y: 600},
                    o: {x: 900, y: 300},
                    h2: {x: 0, y: 300},
                    m1: {x: 450, y: 300},
                    s: {x: 600, y: 100},
                    h1: {x: 450, y: 600},
                    m2: {x: -64, y: 700}
                },
                6: {
                    h1: {x: 450, y: 600},
                    m2: {x: 450, y: 300},
                    o: {x: 900, y: 300},
                    h2: {x: 0, y: 300},
                    l: {x: 400, y: 700},
                    s: {x: 600, y: 100},
                    m1: {x: -64, y: 700}
                }
            },
            receivingAttack: {
                1: {
                    s: {x: 600, y: 100},
                    h1: {x: 800, y: 100},
                    m2: {x: 450, y: 100},
                    o: {x: 100, y: 100},
                    h2: {x: 450, y: 300},
                    l: {x: 400, y: 700},
                    m1: {x: -64, y: 700}
                },
                2: {
                    l: {x: 700, y: 600},
                    s: {x: 600, y: 100},
                    h1: {x: 100, y: 100},
                    m2: {x: 450, y: 100},
                    o: {x: 840, y: 300},
                    h2: {x: 440, y: 300},
                    m1: {x: -64, y: 700}
                },
                3: {
                    h2: {x: 450, y: 300},
                    m1: {x: 450, y: 100},
                    s: {x: 600, y: 100},
                    h1: {x: 100, y: 100},
                    l: {x: 450, y: 700},
                    o: {x: 840, y: 300},
                    m2: {x: -64, y: 700}
                },
                4: {
                    o: {x: 840, y: 300},
                    h2: {x: 100, y: 100},
                    m1: {x: 450, y: 100},
                    s: {x: 600, y: 100},
                    h1: {x: 450, y: 700},
                    l: {x: 700, y: 600},
                    m2: {x: -64, y: 700}
                },
                5: {
                    l: {x: 700, y: 600},
                    o: {x: 800, y: 100},
                    h2: {x: 100, y: 100},
                    m1: {x: 450, y: 100},
                    s: {x: 600, y: 100},
                    h1: {x: 450, y: 300},
                    m2: {x: -64, y: 700}
                },
                6: {
                    h1: {x: 450, y: 300},
                    m2: {x: 450, y: 100},
                    o: {x: 800, y: 100},
                    h2: {x: 100, y: 100},
                    l: {x: 400, y: 700},
                    s: {x: 600, y: 100},
                    m1: {x: -64, y: 700}
                }
            },
            receivingSwitch: {
                1: {
                    s: {x: 700, y: 600},
                    h1: {x: 700, y: 100},
                    m2: {x: 450, y: 100},
                    o: {x: 200, y: 100},
                    h2: {x: 450, y: 700},
                    l: {x: 200, y: 600},
                    m1: {x: -64, y: 700}
                },
                2: {
                    l: {x: 200, y: 600},
                    s: {x: 700, y: 100},
                    h1: {x: 200, y: 100},
                    m2: {x: 450, y: 100},
                    o: {x: 700, y: 600},
                    h2: {x: 450, y: 700},
                    m1: {x: -64, y: 700}
                },
                3: {
                    h2: {x: 450, y: 700},
                    m1: {x: 450, y: 100},
                    s: {x: 700, y: 100},
                    h1: {x: 200, y: 100},
                    l: {x: 200, y: 600},
                    o: {x: 700, y: 600},
                    m2: {x: -64, y: 700}
                },
                4: {
                    o: {x: 700, y: 600},
                    h2: {x: 200, y: 100},
                    m1: {x: 450, y: 100},
                    s: {x: 700, y: 100},
                    h1: {x: 450, y: 700},
                    l: {x: 200, y: 600},
                    m2: {x: -64, y: 700}
                },
                5: {
                    l: {x: 200, y: 600},
                    o: {x: 700, y: 100},
                    h2: {x: 200, y: 100},
                    m1: {x: 450, y: 100},
                    s: {x: 700, y: 600},
                    h1: {x: 450, y: 700},
                    m2: {x: -64, y: 700}
                },
                6: {
                    h1: {x: 450, y: 700},
                    m2: {x: 450, y: 100},
                    o: {x: 700, y: 100},
                    h2: {x: 200, y: 100},
                    l: {x: 200, y: 600},
                    s: {x: 700, y: 600},
                    m1: {x: -64, y: 700}
                }
            },
        }
        this.players = {
            s: this.court.addPlayer(this.playerPositions.servingBase[startPosition].s.x, this.playerPositions.servingBase[startPosition].s.y, this.text[this.language].players.s, config.playersImg.s),
            h1: this.court.addPlayer(this.playerPositions.servingBase[startPosition].h1.x, this.playerPositions.servingBase[startPosition].h1.y, this.text[this.language].players.h1, config.playersImg.h1),
            m1: this.court.addPlayer(this.playerPositions.servingBase[startPosition].m1.x, this.playerPositions.servingBase[startPosition].m1.y, this.text[this.language].players.m1, config.playersImg.m1),
            o: this.court.addPlayer(this.playerPositions.servingBase[startPosition].o.x, this.playerPositions.servingBase[startPosition].o.y, this.text[this.language].players.o, config.playersImg.o),
            h2: this.court.addPlayer(this.playerPositions.servingBase[startPosition].h2.x, this.playerPositions.servingBase[startPosition].h2.y, this.text[this.language].players.h2, config.playersImg.h2),
            m2: this.court.addPlayer(this.playerPositions.servingBase[startPosition].m2.x, this.playerPositions.servingBase[startPosition].m2.y, this.text[this.language].players.m2, config.playersImg.m2),
            l: this.court.addPlayer(this.playerPositions.servingBase[startPosition].l.x, this.playerPositions.servingBase[startPosition].l.y, this.text[this.language].players.l, config.playersImg.l)
        }

        this.state = {
            moving: false,
            setterAt: startPosition
        }
    }

    draw() {
        if (this.drawn) {
            return
        }
        this.drawn = true
        this.court.draw()
        this.drawRotationControl()
        this.drawActionControl()
    }

    multilineText(text, lineHeight, style) {
        let textGroup
        text.split('\n').forEach((textChunks, i) => {
            let textLine = this.svg.snapRoot.text(0, 0 + (i * lineHeight * this.svg.scale), textChunks).attr(style)
            if (textGroup) {
                textGroup.add(textLine)
            } else {
                textGroup = this.svg.snapRoot.group(textLine)
            }
        })
        return textGroup
    }

    drawRotationControl() {
        const vOffset1 = 20 * this.svg.scale
        const vOffset2 = 140 * this.svg.scale

        const box1 = this.svg.snapRoot.rect(0, 0 * this.svg.scale, 540 * this.svg.scale, 60 * this.svg.scale).attr({
            fill: this.colours.rotationControlBackgroundColourB,
        })
        const box2 = this.svg.snapRoot.rect(0, 60 * this.svg.scale, 540 * this.svg.scale, 160 * this.svg.scale).attr({
            fill: this.colours.rotationControlBackgroundColourA,
        })
        const box3 = this.svg.snapRoot.rect(0, 60 * this.svg.scale + (1 * (vOffset1 + vOffset2)), 540 * this.svg.scale, 160 * this.svg.scale).attr({
            fill: this.colours.rotationControlBackgroundColourB,
        })
        const box4 = this.svg.snapRoot.rect(0, 60 * this.svg.scale + (2 * (vOffset1 + vOffset2)), 540 * this.svg.scale, 160 * this.svg.scale).attr({
            fill: this.colours.rotationControlBackgroundColourA,
        })
        const box5 = this.svg.snapRoot.rect(0, 60 * this.svg.scale + (3 * (vOffset1 + vOffset2)), 540 * this.svg.scale, 160 * this.svg.scale).attr({
            fill: this.colours.rotationControlBackgroundColourB,
        })
        const box6 = this.svg.snapRoot.rect(0, 60 * this.svg.scale + (4 * (vOffset1 + vOffset2)), 540 * this.svg.scale, 160 * this.svg.scale).attr({
            fill: this.colours.rotationControlBackgroundColourA,
        })
        const box7 = this.svg.snapRoot.rect(0, 60 * this.svg.scale + (5 * (vOffset1 + vOffset2)), 540 * this.svg.scale, 161 * this.svg.scale).attr({
            fill: this.colours.rotationControlBackgroundColourB,
        })
        const backgroundBoxes = this.svg.snapRoot.group(box1, box2, box3, box4, box5, box6, box7)

        const textHeadingAttrs = {
            fill: this.colours.rotationControlColour,
            stroke: this.colours.rotationControlColour,
            strokeWidth: 2 * this.svg.scale,
            'text-anchor': 'middle',
            'font-family': 'Verdana',
            'font-size': '' + 28 * this.svg.scale,
        };
        const textHeadingS = this.svg.snapRoot.text(80 * this.svg.scale, 40 * this.svg.scale, this.text[this.language].rotationControl.serving).attr(textHeadingAttrs)
        const textHeadingR = this.svg.snapRoot.text(280 * this.svg.scale, 40 * this.svg.scale, this.text[this.language].rotationControl.receiving).attr(textHeadingAttrs)
        const headingLabels = this.svg.snapRoot.group(textHeadingS, textHeadingR)

        const textLabel2 = this.buildTextLabel(this.text[this.language].rotationControl.s2, 0)
        const textLabel1 = this.buildTextLabel(this.text[this.language].rotationControl.s1, 1 * (vOffset1 + vOffset2))
        const textLabel6 = this.buildTextLabel(this.text[this.language].rotationControl.s6, 2 * (vOffset1 + vOffset2))
        const textLabel5 = this.buildTextLabel(this.text[this.language].rotationControl.s5, 3 * (vOffset1 + vOffset2))
        const textLabel4 = this.buildTextLabel(this.text[this.language].rotationControl.s4, 4 * (vOffset1 + vOffset2))
        const textLabel3 = this.buildTextLabel(this.text[this.language].rotationControl.s3, 5 * (vOffset1 + vOffset2))
        const rotationLabels = this.svg.snapRoot.group(textLabel1, textLabel2, textLabel3, textLabel4, textLabel5, textLabel6)

        const strokeWidthBig = 4 * this.svg.scale;
        const strokeDashArray = 8 * this.svg.scale + ', ' + 8 * this.svg.scale;
        let joinLineAttrs = {
            stroke: this.colours.rotationControlColour,
            strokeWidth: strokeWidthBig,
            'stroke-dasharray': strokeDashArray,
        };
        const joinLine1 = this.svg.snapRoot.line(80 * this.svg.scale, 100 * this.svg.scale, 280 * this.svg.scale, 100 * this.svg.scale + (1 * vOffset1)).attr(joinLineAttrs)
        const joinLine2 = this.svg.snapRoot.line(280 * this.svg.scale, 100 * this.svg.scale + (1 * vOffset1), 80 * this.svg.scale, 100 * this.svg.scale + (1 * vOffset1) + (1 * vOffset2)).attr(joinLineAttrs)
        const joinLine3 = this.svg.snapRoot.line(80 * this.svg.scale, 100 * this.svg.scale + (1 * vOffset1) + (1 * vOffset2), 280 * this.svg.scale, 100 * this.svg.scale + (2 * vOffset1) + (1 * vOffset2)).attr(joinLineAttrs)
        const joinLine4 = this.svg.snapRoot.line(280 * this.svg.scale, 100 * this.svg.scale + (2 * vOffset1) + (1 * vOffset2), 80 * this.svg.scale, 100 * this.svg.scale + (2 * vOffset1) + (2 * vOffset2)).attr(joinLineAttrs)
        const joinLine5 = this.svg.snapRoot.line(80 * this.svg.scale, 100 * this.svg.scale + (2 * vOffset1) + (2 * vOffset2), 280 * this.svg.scale, 100 * this.svg.scale + (3 * vOffset1) + (2 * vOffset2)).attr(joinLineAttrs)
        const joinLine6 = this.svg.snapRoot.line(280 * this.svg.scale, 100 * this.svg.scale + (3 * vOffset1) + (2 * vOffset2), 80 * this.svg.scale, 100 * this.svg.scale + (3 * vOffset1) + (3 * vOffset2)).attr(joinLineAttrs)
        const joinLine7 = this.svg.snapRoot.line(80 * this.svg.scale, 100 * this.svg.scale + (3 * vOffset1) + (3 * vOffset2), 280 * this.svg.scale, 100 * this.svg.scale + (4 * vOffset1) + (3 * vOffset2)).attr(joinLineAttrs)
        const joinLine8 = this.svg.snapRoot.line(280 * this.svg.scale, 100 * this.svg.scale + (4 * vOffset1) + (3 * vOffset2), 80 * this.svg.scale, 100 * this.svg.scale + (4 * vOffset1) + (4 * vOffset2)).attr(joinLineAttrs)
        const joinLine9 = this.svg.snapRoot.line(80 * this.svg.scale, 100 * this.svg.scale + (4 * vOffset1) + (4 * vOffset2), 280 * this.svg.scale, 100 * this.svg.scale + (5 * vOffset1) + (4 * vOffset2)).attr(joinLineAttrs)
        const joinLine10 = this.svg.snapRoot.line(280 * this.svg.scale, 100 * this.svg.scale + (5 * vOffset1) + (4 * vOffset2), 80 * this.svg.scale, 100 * this.svg.scale + (5 * vOffset1) + (5 * vOffset2)).attr(joinLineAttrs)
        const joinLine11 = this.svg.snapRoot.line(80 * this.svg.scale, 100 * this.svg.scale + (5 * vOffset1) + (5 * vOffset2), 280 * this.svg.scale, 100 * this.svg.scale + (6 * vOffset1) + (5 * vOffset2)).attr(joinLineAttrs)

        const joinLines = this.svg.snapRoot.group(joinLine1, joinLine2, joinLine3, joinLine4, joinLine5, joinLine6, joinLine7, joinLine8, joinLine9, joinLine10, joinLine11)

        const setLinesAttrs = {
            stroke: this.colours.rotationControlColour,
            strokeWidth: 1,
            'stroke-dasharray': 12 * this.svg.scale + ', ' + 12 * this.svg.scale,
        };
        const setLineS = this.svg.snapRoot.line(80 * this.svg.scale, 100 * this.svg.scale, 80 * this.svg.scale, 100 * this.svg.scale + (5 * vOffset1) + (5 * vOffset2)).attr(setLinesAttrs)
        const setLineR = this.svg.snapRoot.line(280 * this.svg.scale, 100 * this.svg.scale, 280 * this.svg.scale, 100 * this.svg.scale + (6 * vOffset1) + (5 * vOffset2)).attr(setLinesAttrs)
        const setLines = this.svg.snapRoot.group(setLineS, setLineR)

        let circleAttrs = {
            stroke: this.colours.rotationControlColour,
            strokeWidth: strokeWidthBig,
            cursor: 'pointer',
        };
        this.controlTwoSrv = this.svg.snapRoot.circle(80 * this.svg.scale, 100 * this.svg.scale, this.svg.rotationControlCirleRadius).attr({
            ...circleAttrs,
            fill: this.colours.rotationControlBackgroundColourA,
        })
        this.controlTwoRcv = this.svg.snapRoot.circle(280 * this.svg.scale, 100 * this.svg.scale + (1 * vOffset1), this.svg.rotationControlCirleRadius).attr({
            ...circleAttrs, fill: this.colours.rotationControlBackgroundColourA,
        })

        this.controlOneSrv = this.svg.snapRoot.circle(80 * this.svg.scale, 100 * this.svg.scale + (1 * vOffset1) + (1 * vOffset2), this.svg.rotationControlCirleRadius).attr({
            ...circleAttrs, fill: this.colours.rotationControlColour,
        })
        this.controlOneRcv = this.svg.snapRoot.circle(280 * this.svg.scale, 100 * this.svg.scale + (2 * vOffset1) + (1 * vOffset2), this.svg.rotationControlCirleRadius).attr({
            ...circleAttrs, fill: this.colours.rotationControlBackgroundColourB,
        })

        this.controlSixSrv = this.svg.snapRoot.circle(80 * this.svg.scale, 100 * this.svg.scale + (2 * vOffset1) + (2 * vOffset2), this.svg.rotationControlCirleRadius).attr({
            ...circleAttrs, fill: this.colours.rotationControlBackgroundColourA,
        })
        this.controlSixRcv = this.svg.snapRoot.circle(280 * this.svg.scale, 100 * this.svg.scale + (3 * vOffset1) + (2 * vOffset2), this.svg.rotationControlCirleRadius).attr({
            ...circleAttrs, fill: this.colours.rotationControlBackgroundColourA,
        })

        this.controlFiveSrv = this.svg.snapRoot.circle(80 * this.svg.scale, 100 * this.svg.scale + (3 * vOffset1) + (3 * vOffset2), this.svg.rotationControlCirleRadius).attr({
            ...circleAttrs, fill: this.colours.rotationControlBackgroundColourB,
        })
        this.controlFiveRcv = this.svg.snapRoot.circle(280 * this.svg.scale, 100 * this.svg.scale + (4 * vOffset1) + (3 * vOffset2), this.svg.rotationControlCirleRadius).attr({
            ...circleAttrs, fill: this.colours.rotationControlBackgroundColourB,
        })

        this.controlFourSrv = this.svg.snapRoot.circle(80 * this.svg.scale, 100 * this.svg.scale + (4 * vOffset1) + (4 * vOffset2), this.svg.rotationControlCirleRadius).attr({
            ...circleAttrs, fill: this.colours.rotationControlBackgroundColourA,
        })
        this.controlFourRcv = this.svg.snapRoot.circle(280 * this.svg.scale, 100 * this.svg.scale + (5 * vOffset1) + (4 * vOffset2), this.svg.rotationControlCirleRadius).attr({
            ...circleAttrs, fill: this.colours.rotationControlBackgroundColourA,
        })

        this.controlThreeSrv = this.svg.snapRoot.circle(80 * this.svg.scale, 100 * this.svg.scale + (5 * vOffset1) + (5 * vOffset2), this.svg.rotationControlCirleRadius).attr({
            ...circleAttrs, fill: this.colours.rotationControlBackgroundColourB,
        })
        this.controlThreeRcv = this.svg.snapRoot.circle(280 * this.svg.scale, 100 * this.svg.scale + (6 * vOffset1) + (5 * vOffset2), this.svg.rotationControlCirleRadius).attr({
            ...circleAttrs, fill: this.colours.rotationControlBackgroundColourB,
        })

        const controlCircles =
            this.svg.snapRoot.group(this.controlOneSrv, this.controlTwoSrv, this.controlThreeSrv, this.controlFourSrv, this.controlFiveSrv, this.controlSixSrv,
                this.controlOneRcv, this.controlTwoRcv, this.controlThreeRcv, this.controlFourRcv, this.controlFiveRcv, this.controlSixRcv)

        function buildEvent(position, serving) {
            return () => {
                this.state.setterAt = position;

                let playerServingReceiving;
                let controlServingReceiving;
                if (serving) {
                    playerServingReceiving = this.playerPositions.servingBase;
                    controlServingReceiving = this.controlServeBase
                }
                else {
                    playerServingReceiving = this.playerPositions.receivingBase;
                    controlServingReceiving = this.controlReceiveBase
                }


                if (!this.state.moving) {
                    this.controlSelect(this.state.setterAt, serving, controlServingReceiving);
                    this.move(playerServingReceiving[this.state.setterAt], 600).then(() => this.state.moving = false)
                }
            };
        }

        this.controlOneRcv.click(buildEvent.call(this, 1, false))
        this.controlOneSrv.click(buildEvent.call(this, 1, true))
        this.controlTwoSrv.click(buildEvent.call(this, 2, true))
        this.controlTwoRcv.click(buildEvent.call(this, 2, false))
        this.controlSixRcv.click(buildEvent.call(this, 6, false))
        this.controlSixSrv.click(buildEvent.call(this, 6, true))
        this.controlFiveRcv.click(buildEvent.call(this, 5, false))
        this.controlFiveSrv.click(buildEvent.call(this, 5, true))
        this.controlFourRcv.click(buildEvent.call(this, 4, false))
        this.controlFourSrv.click(buildEvent.call(this, 4, true))
        this.controlThreeRcv.click(buildEvent.call(this, 3, false))
        this.controlThreeSrv.click(buildEvent.call(this, 3, true))

        this.rotationControls = this.svg.snapRoot.group(backgroundBoxes, headingLabels, rotationLabels, joinLines, setLines, controlCircles)

        this.rotationControls.transform(`t${1150 * this.svg.scale}, ${50 * this.svg.scale}`)
    }

    buildTextLabel(text1, number1) {
        return this.multilineText(text1, 28, {
            fill: this.colours.rotationControlColour,
            stroke: this.colours.rotationControlColour,
            strokeWidth: 2 * this.svg.scale,
            'text-anchor': 'middle',
            'font-family': 'Verdana',
            'font-size': 28 * this.svg.scale,
        }).transform(`t${420 * this.svg.scale}, ${100 * this.svg.scale + number1}`);
    }

    drawActionControl() {
        const xOffSet = 220
        const actionBox1 = this.svg.snapRoot.rect(0, 170 * this.svg.scale, xOffSet * this.svg.scale, 450 * this.svg.scale).attr({
            fill: this.colours.rotationControlBackgroundColourB
        })
        const actionBox2 = this.svg.snapRoot.rect(xOffSet * this.svg.scale, 170 * this.svg.scale, xOffSet * this.svg.scale, 450 * this.svg.scale).attr({
            fill: this.colours.rotationControlBackgroundColourA
        })
        const actionBox3 = this.svg.snapRoot.rect((2 * xOffSet) * this.svg.scale, 170 * this.svg.scale, xOffSet * this.svg.scale, 450 * this.svg.scale).attr({
            fill: this.colours.rotationControlBackgroundColourB
        })
        const actionBox4 = this.svg.snapRoot.rect((3 * xOffSet) * this.svg.scale, 170 * this.svg.scale, xOffSet * this.svg.scale, 450 * this.svg.scale).attr({
            fill: this.colours.rotationControlBackgroundColourA
        })
        const actionBox5 = this.svg.snapRoot.rect((4 * xOffSet) * this.svg.scale, 170 * this.svg.scale, xOffSet * this.svg.scale, 450 * this.svg.scale).attr({
            fill: this.colours.rotationControlBackgroundColourB
        })
        const actionBoxes = this.svg.snapRoot.group(actionBox1, actionBox2, actionBox3, actionBox4, actionBox5)
// 990
// 1240
        const linkBar1 = this.svg.snapRoot.rect((4.5 * xOffSet) * this.svg.scale, 230 * this.svg.scale, (1240 - (4.5 * xOffSet)) * this.svg.scale, 40 * this.svg.scale).attr({
            fill: this.colours.rotationControlBackgroundColourB
        })
        const linkBar2 = this.svg.snapRoot.rect(1200 * this.svg.scale, 120 * this.svg.scale, 40 * this.svg.scale, 150 * this.svg.scale).attr({
            fill: this.colours.rotationControlBackgroundColourB
        })
        const linkBar3 = this.svg.snapRoot.rect((4.5 * xOffSet) * this.svg.scale, 450 * this.svg.scale, (1440 - (4.5 * xOffSet)) * this.svg.scale, 40 * this.svg.scale).attr({
            fill: this.colours.rotationControlBackgroundColourB
        })
        const linkBar4 = this.svg.snapRoot.rect(1400 * this.svg.scale, 120 * this.svg.scale, 40 * this.svg.scale, 370 * this.svg.scale).attr({
            fill: this.colours.rotationControlBackgroundColourB
        })
        const linkLine1 = this.svg.snapRoot.line((xOffSet / 2) * this.svg.scale, 250 * this.svg.scale, 1220 * this.svg.scale, 250 * this.svg.scale).attr({
            stroke: this.colours.rotationControlColour,
            strokeWidth: 1,
            'stroke-dasharray': 12 * this.svg.scale + ', ' + 12 * this.svg.scale
        })
        const linkLine2 = this.svg.snapRoot.line(1220 * this.svg.scale, 250 * this.svg.scale, 1220 * this.svg.scale, this.svg.rotationControlCirleRadius).attr({
            stroke: this.colours.rotationControlColour,
            strokeWidth: 1,
            'stroke-dasharray': 12 * this.svg.scale + ', ' + 12 * this.svg.scale
        })
        const linkLine3 = this.svg.snapRoot.line((xOffSet / 2) * this.svg.scale, 470 * this.svg.scale, 1420 * this.svg.scale, 470 * this.svg.scale).attr({
            stroke: this.colours.rotationControlColour,
            strokeWidth: 1,
            'stroke-dasharray': 12 * this.svg.scale + ', ' + 12 * this.svg.scale
        })
        const linkLine4 = this.svg.snapRoot.line(1420 * this.svg.scale, 470 * this.svg.scale, 1420 * this.svg.scale, 20 * this.svg.scale + this.svg.rotationControlCirleRadius).attr({
            stroke: this.colours.rotationControlColour,
            strokeWidth: 1,
            'stroke-dasharray': 12 * this.svg.scale + ', ' + 12 * this.svg.scale
        })
        const links = this.svg.snapRoot.group(linkBar1, linkBar2, linkBar3, linkBar4, linkLine1, linkLine2, linkLine3, linkLine4)

        const textHeadingS = this.svg.snapRoot.text(70 * this.svg.scale, 206 * this.svg.scale, this.text[this.language].rotationControl.serving)
        textHeadingS.attr({
            fill: this.colours.rotationControlColour,
            stroke: this.colours.rotationControlColour,
            strokeWidth: 2 * this.svg.scale,
            'text-anchor': 'middle',
            'font-family': 'Verdana',
            'font-size': 28 * this.svg.scale
        })
        const textHeadingR = this.svg.snapRoot.text(80 * this.svg.scale, 416 * this.svg.scale, this.text[this.language].rotationControl.receiving)
        textHeadingR.attr({
            fill: this.colours.rotationControlColour,
            stroke: this.colours.rotationControlColour,
            strokeWidth: 2 * this.svg.scale,
            'text-anchor': 'middle',
            'font-family': 'Verdana',
            'font-size': 28 * this.svg.scale
        })
        const headingLabels = this.svg.snapRoot.group(textHeadingS, textHeadingR)

        this.controlServeBase = this.svg.snapRoot.circle((0.5 * xOffSet) * this.svg.scale, 250 * this.svg.scale, this.svg.rotationControlCirleRadius).attr({
            stroke: this.colours.rotationControlColour,
            strokeWidth: 4 * this.svg.scale,
            fill: this.colours.rotationControlColour,
            cursor: 'pointer'
        })
        this.controlServeServe = this.svg.snapRoot.circle((2.5 * xOffSet) * this.svg.scale, 250 * this.svg.scale, this.svg.rotationControlCirleRadius).attr({
            stroke: this.colours.rotationControlColour,
            strokeWidth: 4 * this.svg.scale,
            fill: this.colours.rotationControlBackgroundColourA,
            cursor: 'pointer'
        })
        this.controlServeSwitch = this.svg.snapRoot.circle((4.5 * xOffSet) * this.svg.scale, 250 * this.svg.scale, this.svg.rotationControlCirleRadius).attr({
            stroke: this.colours.rotationControlColour,
            strokeWidth: 4 * this.svg.scale,
            fill: this.colours.rotationControlBackgroundColourA,
            cursor: 'pointer'
        })
        const controlServe = this.svg.snapRoot.group(this.controlServeBase, this.controlServeServe, this.controlServeSwitch)

        this.controlReceiveBase = this.svg.snapRoot.circle((0.5 * xOffSet) * this.svg.scale, 470 * this.svg.scale, this.svg.rotationControlCirleRadius).attr({
            stroke: this.colours.rotationControlColour,
            strokeWidth: 4 * this.svg.scale,
            fill: this.colours.rotationControlBackgroundColourA,
            cursor: 'pointer'
        })
        this.controlReceiveReceive = this.svg.snapRoot.circle((1.5 * xOffSet) * this.svg.scale, 470 * this.svg.scale, this.svg.rotationControlCirleRadius).attr({
            stroke: this.colours.rotationControlColour,
            strokeWidth: 4 * this.svg.scale,
            fill: this.colours.rotationControlBackgroundColourA,
            cursor: 'pointer'
        })
        this.controlReceiveSet = this.svg.snapRoot.circle((2.5 * xOffSet) * this.svg.scale, 470 * this.svg.scale, this.svg.rotationControlCirleRadius).attr({
            stroke: this.colours.rotationControlColour,
            strokeWidth: 4 * this.svg.scale,
            fill: this.colours.rotationControlBackgroundColourA,
            cursor: 'pointer'
        })
        this.controlReceiveHit = this.svg.snapRoot.circle((3.5 * xOffSet) * this.svg.scale, 470 * this.svg.scale, this.svg.rotationControlCirleRadius).attr({
            stroke: this.colours.rotationControlColour,
            strokeWidth: 4 * this.svg.scale,
            fill: this.colours.rotationControlBackgroundColourA,
            cursor: 'pointer'
        })
        this.controlReceiveSwitch = this.svg.snapRoot.circle((4.5 * xOffSet) * this.svg.scale, 470 * this.svg.scale, this.svg.rotationControlCirleRadius).attr({
            stroke: this.colours.rotationControlColour,
            strokeWidth: 4 * this.svg.scale,
            fill: this.colours.rotationControlBackgroundColourA,
            cursor: 'pointer'
        })
        const controlReceive = this.svg.snapRoot.group(this.controlReceiveBase, this.controlReceiveReceive, this.controlReceiveSet, this.controlReceiveHit, this.controlReceiveSwitch)

        const textLabelS1 = this.multilineText(this.text[this.language].actionControl.servingBase, 36, {
            fill: this.colours.rotationControlColour,
            stroke: this.colours.rotationControlColour,
            strokeWidth: 2 * this.svg.scale,
            'text-anchor': 'middle',
            'font-family': 'Verdana',
            'font-size': 36 * this.svg.scale
        }).transform(`t${(0.5 * xOffSet) * this.svg.scale},${330 * this.svg.scale}`)
        const textLabelS2 = this.svg.snapRoot.text((2.5 * xOffSet) * this.svg.scale, 330 * this.svg.scale, this.text[this.language].actionControl.serve).attr({
            fill: this.colours.rotationControlColour,
            stroke: this.colours.rotationControlColour,
            strokeWidth: 2 * this.svg.scale,
            'text-anchor': 'middle',
            'font-family': 'Verdana',
            'font-size': 36 * this.svg.scale
        })
        const textLabelS3 = this.svg.snapRoot.text((4.5 * xOffSet) * this.svg.scale, 330 * this.svg.scale, this.text[this.language].actionControl.switch).attr({
            fill: this.colours.rotationControlColour,
            stroke: this.colours.rotationControlColour,
            strokeWidth: 2 * this.svg.scale,
            'text-anchor': 'middle',
            'font-family': 'Verdana',
            'font-size': 36 * this.svg.scale
        })
        const textLabelS = this.svg.snapRoot.group(textLabelS1, textLabelS2, textLabelS3)

        const textLabelR1 = this.multilineText(this.text[this.language].actionControl.servingBase, 36, {
            fill: this.colours.rotationControlColour,
            stroke: this.colours.rotationControlColour,
            strokeWidth: 2 * this.svg.scale,
            'text-anchor': 'middle',
            'font-family': 'Verdana',
            'font-size': 36 * this.svg.scale
        }).transform(`t${(0.5 * xOffSet) * this.svg.scale}, ${550 * this.svg.scale}`)
        const textLabelR2 = this.svg.snapRoot.text((1.5 * xOffSet) * this.svg.scale, 550 * this.svg.scale, this.text[this.language].actionControl.pass).attr({
            fill: this.colours.rotationControlColour,
            stroke: this.colours.rotationControlColour,
            strokeWidth: 2 * this.svg.scale,
            'text-anchor': 'middle',
            'font-family': 'Verdana',
            'font-size': 36 * this.svg.scale
        })
        const textLabelR3 = this.svg.snapRoot.text((2.5 * xOffSet) * this.svg.scale, 550 * this.svg.scale, this.text[this.language].actionControl.set).attr({
            fill: this.colours.rotationControlColour,
            stroke: this.colours.rotationControlColour,
            strokeWidth: 2 * this.svg.scale,
            'text-anchor': 'middle',
            'font-family': 'Verdana',
            'font-size': 36 * this.svg.scale
        })
        const textLabelR4 = this.svg.snapRoot.text((3.5 * xOffSet) * this.svg.scale, 550 * this.svg.scale, this.text[this.language].actionControl.attack).attr({
            fill: this.colours.rotationControlColour,
            stroke: this.colours.rotationControlColour,
            strokeWidth: 2 * this.svg.scale,
            'text-anchor': 'middle',
            'font-family': 'Verdana',
            'font-size': 36 * this.svg.scale
        })
        const textLabelR5 = this.svg.snapRoot.text((4.5 * xOffSet) * this.svg.scale, 550 * this.svg.scale, this.text[this.language].actionControl.switch).attr({
            fill: this.colours.rotationControlColour,
            stroke: this.colours.rotationControlColour,
            strokeWidth: 2 * this.svg.scale,
            'text-anchor': 'middle',
            'font-family': 'Verdana',
            'font-size': 36 * this.svg.scale
        })
        const textLabelR = this.svg.snapRoot.group(textLabelR1, textLabelR2, textLabelR3, textLabelR4, textLabelR5)

        this.controlServeBase.click(() => {
            if (!this.state.moving) {
                this.controlSelect(this.state.setterAt, true, this.controlServeBase);
                this.move(this.playerPositions.servingBase[this.state.setterAt], 600).then(() => this.state.moving = false)
            }
        })
        this.controlServeServe.click(() => {
            if (!this.state.moving) {
                this.controlSelect(this.state.setterAt, true, this.controlServeServe);
                this.move(this.playerPositions.servingServe[this.state.setterAt], 600).then(() => this.state.moving = false)
            }
        })
        this.controlServeSwitch.click(() => {
            if (!this.state.moving) {
                this.controlSelect(this.state.setterAt, true, this.controlServeSwitch);
                this.move(this.playerPositions.servingSwitch[this.state.setterAt], 600).then(() => this.state.moving = false)
            }
        })
        this.controlReceiveBase.click(() => {
            if (!this.state.moving) {
                this.controlSelect(this.state.setterAt, false, this.controlReceiveBase);
                this.move(this.playerPositions.receivingBase[this.state.setterAt], 600).then(() => this.state.moving = false)
            }
        })
        this.controlReceiveReceive.click(() => {
            if (!this.state.moving) {
                this.controlSelect(this.state.setterAt, false, this.controlReceiveReceive);
                this.move(this.playerPositions.receivingPass[this.state.setterAt], 600).then(() => this.state.moving = false)
            }
        })
        this.controlReceiveSet.click(() => {
            if (!this.state.moving) {
                this.controlSelect(this.state.setterAt, false, this.controlReceiveSet);
                this.move(this.playerPositions.receivingSet[this.state.setterAt], 600).then(() => this.state.moving = false)
            }
        })
        this.controlReceiveHit.click(() => {
            if (!this.state.moving) {
                this.controlSelect(this.state.setterAt, false, this.controlReceiveHit);
                this.move(this.playerPositions.receivingAttack[this.state.setterAt], 600).then(() => this.state.moving = false)
            }
        })
        this.controlReceiveSwitch.click(() => {
            if (!this.state.moving) {
                this.controlSelect(this.state.setterAt, false, this.controlReceiveSwitch);
                this.move(this.playerPositions.receivingSwitch[this.state.setterAt], 600).then(() => this.state.moving = false)
            }
        })

        this.actionControls = this.svg.snapRoot.group(actionBoxes, links, headingLabels, controlServe, controlReceive, textLabelS, textLabelR)

        this.actionControls.transform(`t${10 * this.svg.scale}, ${950 * this.svg.scale}`)
    }

    controlSelect(setterPos, serving, action) {
        this.controlTwoRcv.attr({fill: this.colours.rotationControlBackgroundColourA})
        this.controlTwoSrv.attr({fill: this.colours.rotationControlBackgroundColourA})
        this.controlOneRcv.attr({fill: this.colours.rotationControlBackgroundColourB})
        this.controlOneSrv.attr({fill: this.colours.rotationControlBackgroundColourB})
        this.controlSixRcv.attr({fill: this.colours.rotationControlBackgroundColourA})
        this.controlSixSrv.attr({fill: this.colours.rotationControlBackgroundColourA})
        this.controlFiveRcv.attr({fill: this.colours.rotationControlBackgroundColourB})
        this.controlFiveSrv.attr({fill: this.colours.rotationControlBackgroundColourB})
        this.controlFourRcv.attr({fill: this.colours.rotationControlBackgroundColourA})
        this.controlFourSrv.attr({fill: this.colours.rotationControlBackgroundColourA})
        this.controlThreeRcv.attr({fill: this.colours.rotationControlBackgroundColourB})
        this.controlThreeSrv.attr({fill: this.colours.rotationControlBackgroundColourB})

        let currentControl
        if (setterPos === 1) {
            currentControl = serving ? this.controlOneSrv : this.controlOneRcv
        } else if (setterPos === 2) {
            currentControl = serving ? this.controlTwoSrv : this.controlTwoRcv
        } else if (setterPos === 3) {
            currentControl = serving ? this.controlThreeSrv : this.controlThreeRcv
        } else if (setterPos === 4) {
            currentControl = serving ? this.controlFourSrv : this.controlFourRcv
        } else if (setterPos === 5) {
            currentControl = serving ? this.controlFiveSrv : this.controlFiveRcv
        } else if (setterPos === 6) {
            currentControl = serving ? this.controlSixSrv : this.controlSixRcv
        }

        currentControl.attr({fill: this.colours.rotationControlColour})
        this.actionSelect(action)
    }

    actionSelect(action) {
        this.controlServeBase.attr({fill: this.colours.rotationControlBackgroundColourA})
        this.controlServeServe.attr({fill: this.colours.rotationControlBackgroundColourA})
        this.controlServeSwitch.attr({fill: this.colours.rotationControlBackgroundColourA})
        this.controlReceiveBase.attr({fill: this.colours.rotationControlBackgroundColourA})
        this.controlReceiveReceive.attr({fill: this.colours.rotationControlBackgroundColourA})
        this.controlReceiveSet.attr({fill: this.colours.rotationControlBackgroundColourA})
        this.controlReceiveHit.attr({fill: this.colours.rotationControlBackgroundColourA})
        this.controlReceiveSwitch.attr({fill: this.colours.rotationControlBackgroundColourA})
        action.attr({fill: this.colours.rotationControlColour})
    }

    move(players, time) {
        this.state.moving = true

        this.players.s.setPosition(players.s.x, players.s.y)
        this.players.o.setPosition(players.o.x, players.o.y)
        this.players.m2.setPosition(players.m2.x, players.m2.y)
        this.players.m1.setPosition(players.m1.x, players.m1.y)
        this.players.h1.setPosition(players.h1.x, players.h1.y)
        this.players.h2.setPosition(players.h2.x, players.h2.y)
        this.players.l.setPosition(players.l.x, players.l.y)

        return this.court.draw()
    }
}