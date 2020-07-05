//const galacticRegionCenterPosition = [28124, 480];
const galacticRegionCenterPosition = [26900, 400];
const rotateFix = -1400;
//const rotateFix = 0;
const rotateDegrees = 3.87;
//const cellRadius = 1848;
const cellRadius = 1665;
//const galmapPositionFix = 1750;
const galmapPositionFix = 0;

function addRegionCircle(step) {
    L.circle(galacticRegionCenterPosition, {
        color: 'gray',
        opacity: 0.3,
        fillColor: 'transparent',
        fillOpactiy: 0,
        radius: getCellRadius(step)
    }).addTo(map);
}

function addRegionRadial(step) {
    let rotatedAngle = getCellRotation(step);
    L.polyline(
        [
            galacticRegionCenterPosition,
            [rotatedAngle.y, rotatedAngle.x]
        ],
        {
            color: 'gray',
            opacity: 0.3,
        }
    ).addTo(map);
}

function getDiffValueFromRadius(radius) {
    let addDiff = 0.0;
    //return addDiff;

    switch (radius) {
        case 30:
        case 29:
        case 28:
        case 27:
        case 26:
        case 25:
        case 24:
        case 23:
        case 22:
        case 21:
            addDiff = 0.35;
            break;
        case 20:
        case 19:
            addDiff = 0.30;
            break;
        case 18:
        case 17:
        case 16:
        case 15:
            addDiff = 0.25;
            break;
        case 14:
            addDiff = 0.20;
            break;
        case 13:
        case 12:
        case 11:
            addDiff = 0.15;
            break;
        case 10:
        case 9:
            addDiff = 0.10;
            break;
        case 6:
            addDiff = -0.10;
            break;
        case 5:
            addDiff = -0.20;
            break;
        case 4:
            addDiff = -0.40;
            break;
        case 3:
            addDiff = -0.80;
            break;
        case 2:
            addDiff = -1.25;
            break;
        case 1:
            addDiff = -2.9;
            break;
        default:
            break;
    }

    return addDiff;
}

function galmapCoords(mapx, mapy) {
    let x = (mapx);
    let y = (mapy) - galmapPositionFix;

    return L.latLng([y, x]);
}

function getCellRadius(step) {
    return cellRadius * step;
}

function getCellRotation(step) {
    return rotate(galacticRegionCenterPosition[1], galacticRegionCenterPosition[0], rotateFix, 83520, step * rotateDegrees);
}
        
function rotate(cx, cy, x, y, angle, anticlock_wise = false) {
    if (angle == 0) {
        return { x: parseFloat(x), y: parseFloat(y) };
    } if (anticlock_wise) {
        var radians = (Math.PI / 180) * angle;
    } else {
        var radians = (Math.PI / -180) * angle;
    }
    var cos = Math.cos(radians);
    var sin = Math.sin(radians);
    var nx = (cos * (x - cx)) + (sin * (y - cy)) + cx;
    var ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
    return { x: nx, y: ny };
}

function getGeoJSONFromGrid(coordinates) {
    let newCoords = [];

    for (let coord of coordinates) {
        let addDiff = getDiffValueFromRadius(coord[0]);

        let rot = rotate(
            galacticRegionCenterPosition[1],
            galacticRegionCenterPosition[0],
            0,
            galacticRegionCenterPosition[0] + (coord[0] * (cellRadius)),
            (coord[1] + addDiff) * rotateDegrees
        );

        let nc = {
            x: rot.x,
            y: rot.y
        };

        newCoords.push([nc.x, nc.y]);
    }

    return newCoords;
};

function addGalaxyRegion(name, popupContent, polygon) {
    return {
        "type": "Feature",
        "properties": {
            "name": name,
            "popupContent": popupContent
        },
        "geometry": {
            "type": "Polygon",
            "coordinates": [[
                ...getGeoJSONFromGrid(polygon)
            ]]
        }
    }
}

function createGalmapMarker(title, x, y) {
    let pinCoords = galmapCoords(x, y);
    let html = title.replace(/(?:\r\n|\r|\n)/g, '<br>');

    L.marker(pinCoords, { title: title, alt: title, riseOnHover: true }).addTo(map).bindPopup(html);
}

const allItems = false;
if (allItems) {
    createGalmapMarker("19 Phi-2 Ceti", -12.31250, -8.28125);
    createGalmapMarker("62 Andromedae", -159.21875, -179.56250);
    createGalmapMarker("69 G. Carinae", 50.78125, 3.15625);
    createGalmapMarker("Alpha Centauri", 3.03125, 3.15625);
    createGalmapMarker("Alpha Chamaelontis", 55.65625, 20.21875);
    createGalmapMarker("Alrai Sector DB-X b1-7", -93.78125, 40.87500);
    createGalmapMarker("Arhul", -39.00000, 119.87500);
    createGalmapMarker("BD-01 2518", 125.93750, 49.53125);
    createGalmapMarker("Baltah'Sine", 85.15625, 40.34375);
    createGalmapMarker("Belgitan", 156.40625, 65.90625);
    createGalmapMarker("Bifrost", 58.68750, -62.46875);
    createGalmapMarker("Borann", 123.03125, 2.84375);
    createGalmapMarker("Bot", -22.84375, 151.12500);
    createGalmapMarker("CD-63 359", 109.87500, 12.37500);
    createGalmapMarker("CD-82 331", 68.03125, 60.40625);
    createGalmapMarker("CPC 22 212", 69.81250, 40.31250);
    createGalmapMarker("CPD-70 2439", 43.81250, 59.00000);
    createGalmapMarker("Core Sys Sector IR-W c1-25", 16.53125, 22.50000);
    createGalmapMarker("Crucis Sector AA-A d119", 85.84375, 49.25000);
    createGalmapMarker("Eanric", 20.59375, 17.31250);
    createGalmapMarker("Eleumo", 45.59375, 61.46875);
    createGalmapMarker("Elli", 60.18750, -6.03125);
    createGalmapMarker("Exioce", 78.50000, 16.78125);
    createGalmapMarker("Fei Lian", -56.46875, 36.12500);
    createGalmapMarker("Fjorgyn", 38.37500, 42.12500);
    createGalmapMarker("Fuelum", 52.00000, 49.81250);
    createGalmapMarker("Gamma-2 Volantis", 126.65625, 26.06250);
    createGalmapMarker("Gebel", 23.40625, 29.37500);
    createGalmapMarker("HD 63154", 979.46875, -131.59375);
    createGalmapMarker("HIP 112113", 83.03125, 81.81250);
    createGalmapMarker("HIP 35211", 159.21875, 14.59375);
    createGalmapMarker("HIP 359", 113.37500, 83.21875);
    createGalmapMarker("HIP 35961", 268.06250, -43.53125);
    createGalmapMarker("HIP 36510", 382.87500, -33.78125);
    createGalmapMarker("HIP 50477", 319.50000, 69.37500);
    createGalmapMarker("HIP 87924", 53.40625, 423.40625);
    createGalmapMarker("HIP 93547", 47.43750, 128.31250);
    createGalmapMarker("HIP 97160", 0.90625, 128.71875);
    createGalmapMarker("HR 6828", 34.00000, 61.18750);
    createGalmapMarker("Hel", -66.03125, -69.96875);
    createGalmapMarker("Horus", -30.90625, -11.71875);
    createGalmapMarker("K'uanele", 69.78125, -68.34375);
    createGalmapMarker("Kamumba", 154.53125, 29.56250);
    createGalmapMarker("Karecoya", 96.28125, 47.93750);
    createGalmapMarker("LHS 1163", 2.37500, 0.68750);
    createGalmapMarker("LHS 137", -51.59375, -38.56250);
    createGalmapMarker("LHS 1920", 25.84375, -30.21875);
    createGalmapMarker("LHS 3836", 9.46875, 12.09375);
    createGalmapMarker("LHS 4012", 16.25000, 24.28125);
    createGalmapMarker("LHS 492", 20.31250, 59.87500);
    createGalmapMarker("LHS 493", 31.84375, 34.50000);
    createGalmapMarker("LP 465-77", -32.81250, -19.12500);
    createGalmapMarker("Maheim", 113.78125, 49.03125);
    createGalmapMarker("Meduwang", 118.93750, 32.00000);
    createGalmapMarker("Morana", 92.53125, 11.34375);
    createGalmapMarker("Moultac", 69.93750, 44.56250);
    createGalmapMarker("Mundii", 85.56250, -0.37500);
    createGalmapMarker("Nepehuevit", 137.81250, 66.21875);
    createGalmapMarker("Nepi", 37.43750, 58.84375);
    createGalmapMarker("Ongkara", 21.34375, 111.28125);
    createGalmapMarker("Orphene", 96.21875, 35.84375);
    createGalmapMarker("Piscium Sector IH-V b2-4", -58.62500, -42.40625);
    createGalmapMarker("Puppis Sector ZZ-Y b1", 62.65625, -51.31250);
    createGalmapMarker("Rana", 6.50000, -19.65625);
    createGalmapMarker("Rhea", 58.12500, -28.59375);
    createGalmapMarker("Ross 625", 42.46875, -39.37500);
    createGalmapMarker("Scorpii Sector PS-U b2-4", 39.62500, 117.65625);
    createGalmapMarker("Shangdi", -3.06250, -2.62500);
    createGalmapMarker("Sokariang", 116.50000, 58.28125);
    createGalmapMarker("Tenerife", -6.40625, 11.03125);
    createGalmapMarker("Tetrian", 63.12500, 38.21875);
    createGalmapMarker("WSI 96", -78.09375, -69.34375);
    createGalmapMarker("Wolf 1062", -20.46875, 25.90625);
    createGalmapMarker("Yimanbin", 51.40625, 37.03125);
}