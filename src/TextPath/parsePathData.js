const getPointOnEllipticalArc = (cx, cy, rx, ry, theta, psi) => {
    let cosPsi = Math.cos(psi), sinPsi = Math.sin(psi);
    let pt = {
        x: rx * Math.cos(theta),
        y: ry * Math.sin(theta)
    };

    return {
        x: cx + (pt.x * cosPsi - pt.y * sinPsi),
        y: cy + (pt.x * sinPsi + pt.y * cosPsi)
    };
};
const getPointOnQuadraticBezier = (pct, P1x, P1y, P2x, P2y, P3x, P3y) => {
    function QB1(t) {
        return t * t;
    }
    function QB2(t) {
        return 2 * t * (1 - t);
    }
    function QB3(t) {
        return (1 - t) * (1 - t);
    }

    let x = P3x * QB1(pct) + P2x * QB2(pct) + P1x * QB3(pct);
    let y = P3y * QB1(pct) + P2y * QB2(pct) + P1y * QB3(pct);

    return {
        x: x,
        y: y
    };
};
const getPointOnCubicBezier = (pct, P1x, P1y, P2x, P2y, P3x, P3y, P4x, P4y) => {
    function CB1(t) {
        return t * t * t;
    }
    function CB2(t) {
        return 3 * t * t * (1 - t);
    }
    function CB3(t) {
        return 3 * t * (1 - t) * (1 - t);
    }
    function CB4(t) {
        return (1 - t) * (1 - t) * (1 - t);
    }
    let x = P4x * CB1(pct) + P3x * CB2(pct) + P2x * CB3(pct) + P1x * CB4(pct);
    let y = P4y * CB1(pct) + P3y * CB2(pct) + P2y * CB3(pct) + P1y * CB4(pct);

    return {
        x: x,
        y: y
    };
};

const getLineLength = (x1, y1, x2, y2) => {
    return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
};

const calcLength = (x, y, cmd, points) => {
    let len, p1, p2, t;

    switch (cmd) {
        case 'L':
            return getLineLength(x, y, points[0], points[1]);
        case 'C':
            len = 0.0;
            p1 = getPointOnCubicBezier(0, x, y, points[0], points[1], points[2], points[3], points[4], points[5]);
            for (t = 0.01; t <= 1; t += 0.01) {
                p2 = getPointOnCubicBezier(t, x, y, points[0], points[1], points[2], points[3], points[4], points[5]);
                len += getLineLength(p1.x, p1.y, p2.x, p2.y);
                p1 = p2;
            }
            return len;
        case 'Q':
            len = 0.0;
            p1 = getPointOnQuadraticBezier(0, x, y, points[0], points[1], points[2], points[3]);
            for (t = 0.01; t <= 1; t += 0.01) {
                p2 = getPointOnQuadraticBezier(t, x, y, points[0], points[1], points[2], points[3]);
                len += getLineLength(p1.x, p1.y, p2.x, p2.y);
                p1 = p2;
            }
            return len;
        case 'A':
            len = 0.0;
            let start = points[4];
            let dTheta = points[5];
            let end = points[4] + dTheta;
            let inc = Math.PI / 180.0;

            if (Math.abs(start - end) < inc) {
                inc = Math.abs(start - end);
            }

            p1 = getPointOnEllipticalArc(points[0], points[1], points[2], points[3], start, 0);
            if (dTheta < 0) {
                for (t = start - inc; t > end; t -= inc) {
                    p2 = getPointOnEllipticalArc(points[0], points[1], points[2], points[3], t, 0);
                    len += getLineLength(p1.x, p1.y, p2.x, p2.y);
                    p1 = p2;
                }
            }
            else {
                for (t = start + inc; t < end; t += inc) {
                    p2 = getPointOnEllipticalArc(points[0], points[1], points[2], points[3], t, 0);
                    len += getLineLength(p1.x, p1.y, p2.x, p2.y);
                    p1 = p2;
                }
            }
            p2 = getPointOnEllipticalArc(points[0], points[1], points[2], points[3], end, 0);
            len += getLineLength(p1.x, p1.y, p2.x, p2.y);
            return len;
    }
    return 0;
};

const parsePathData = (data) => {
    if (!data) {
        return [];
    }
    let cs = data;
    const cc = [
        'm',
        'M',
        'l',
        'L',
        'v',
        'V',
        'h',
        'H',
        'z',
        'Z',
        'c',
        'C',
        'q',
        'Q',
        't',
        'T',
        's',
        'S',
        'a',
        'A'
    ];
    cs = cs.replace(new RegExp(' ', 'g'), ',');

    for (let n = 0; n < cc.length; n++) {
        cs = cs.replace(new RegExp(cc[n], 'g'), '|' + cc[n]);
    }

    let arr = cs.split('|');
    let ca = [];
    let coords = [];
    let cpx = 0;
    let cpy = 0;
    let re = /([-+]?((\d+\.\d+)|((\d+)|(\.\d+)))(?:e[-+]?\d+)?)/gi;
    let match;
    for (let n = 1; n < arr.length; n++) {
        let str = arr[n];
        let c = str.charAt(0);
        str = str.slice(1);
        coords.length = 0;

        while ((match = re.exec(str))) {
            coords.push(match[0]);
        }

        let p = [];

        for (let j = 0, jlen = coords.length; j < jlen; j++) {
            let parsed = parseFloat(coords[j]);

            if (!Number.isNaN(parsed)) {
                p.push(parsed);
            } else {
                p.push(0);
            }
        }
        while (p.length > 0) {
            if (Number.isNaN(p[0])) {
                break;
            }

            let cmd = null;
            let points = [];
            let startX = cpx, startY = cpy;
            let prevCmd, ctlPtx, ctlPty;
            let rx, ry, psi, fa, fs, x1, y1;

            switch (c) {
                case 'l':
                    cpx += p.shift();
                    cpy += p.shift();
                    cmd = 'L';
                    points.push(cpx, cpy);
                    break;
                case 'L':
                    cpx = p.shift();
                    cpy = p.shift();
                    points.push(cpx, cpy);
                    break;
                case 'm':
                    let dx = p.shift();
                    let dy = p.shift();
                    cpx += dx;
                    cpy += dy;
                    cmd = 'M';

                    if (ca.length > 2 && ca[ca.length - 1].command === 'z') {
                        for (let idx = ca.length - 2; idx >= 0; idx--) {
                            if (ca[idx].command === 'M') {
                                cpx = ca[idx].points[0] + dx;
                                cpy = ca[idx].points[1] + dy;
                                break;
                            }
                        }
                    }
                    points.push(cpx, cpy);
                    c = 'l';
                    break;
                case 'M':
                    cpx = p.shift();
                    cpy = p.shift();
                    cmd = 'M';
                    points.push(cpx, cpy);
                    c = 'L';
                    break;
                case 'h':
                    cpx += p.shift();
                    cmd = 'L';
                    points.push(cpx, cpy);
                    break;
                case 'H':
                    cpx = p.shift();
                    cmd = 'L';
                    points.push(cpx, cpy);
                    break;
                case 'v':
                    cpy += p.shift();
                    cmd = 'L';
                    points.push(cpx, cpy);
                    break;
                case 'V':
                    cpy = p.shift();
                    cmd = 'L';
                    points.push(cpx, cpy);
                    break;
                case 'C':
                    points.push(p.shift(), p.shift(), p.shift(), p.shift());
                    cpx = p.shift();
                    cpy = p.shift();
                    points.push(cpx, cpy);
                    break;
                case 'c':
                    points.push(cpx + p.shift(), cpy + p.shift(), cpx + p.shift(), cpy + p.shift());
                    cpx += p.shift();
                    cpy += p.shift();
                    cmd = 'C';
                    points.push(cpx, cpy);
                    break;
                case 'S':
                    ctlPtx = cpx;
                    ctlPty = cpy;
                    prevCmd = ca[ca.length - 1];
                    if (prevCmd.command === 'C') {
                        ctlPtx = cpx + (cpx - prevCmd.points[2]);
                        ctlPty = cpy + (cpy - prevCmd.points[3]);
                    }
                    points.push(ctlPtx, ctlPty, p.shift(), p.shift());
                    cpx = p.shift();
                    cpy = p.shift();
                    cmd = 'C';
                    points.push(cpx, cpy);
                    break;
                case 's':
                    ctlPtx = cpx;
                    ctlPty = cpy;
                    prevCmd = ca[ca.length - 1];
                    if (prevCmd.command === 'C') {
                        ctlPtx = cpx + (cpx - prevCmd.points[2]);
                        ctlPty = cpy + (cpy - prevCmd.points[3]);
                    }
                    points.push(ctlPtx, ctlPty, cpx + p.shift(), cpy + p.shift());
                    cpx += p.shift();
                    cpy += p.shift();
                    cmd = 'C';
                    points.push(cpx, cpy);
                    break;
                case 'Q':
                    points.push(p.shift(), p.shift());
                    cpx = p.shift();
                    cpy = p.shift();
                    points.push(cpx, cpy);
                    break;
                case 'q':
                    points.push(cpx + p.shift(), cpy + p.shift());
                    cpx += p.shift();
                    cpy += p.shift();
                    cmd = 'Q';
                    points.push(cpx, cpy);
                    break;
                case 'T':
                    ctlPtx = cpx;
                    ctlPty = cpy;
                    prevCmd = ca[ca.length - 1];
                    if (prevCmd.command === 'Q') {
                        ctlPtx = cpx + (cpx - prevCmd.points[0]);
                        ctlPty = cpy + (cpy - prevCmd.points[1]);
                    }
                    cpx = p.shift();
                    cpy = p.shift();
                    cmd = 'Q';
                    points.push(ctlPtx, ctlPty, cpx, cpy);
                    break;
                case 't':
                    ctlPtx = cpx;
                    ctlPty = cpy;
                    prevCmd = ca[ca.length - 1];
                    if (prevCmd.command === 'Q') {
                        ctlPtx = cpx + (cpx - prevCmd.points[0]);
                        ctlPty = cpy + (cpy - prevCmd.points[1]);
                    }
                    cpx += p.shift();
                    cpy += p.shift();
                    cmd = 'Q';
                    points.push(ctlPtx, ctlPty, cpx, cpy);
                    break;
                case 'A':
                    rx = p.shift();
                    ry = p.shift();
                    psi = p.shift();
                    fa = p.shift();
                    fs = p.shift();
                    x1 = cpx;
                    y1 = cpy;
                    cpx = p.shift();
                    cpy = p.shift();
                    cmd = 'A';
                    points = this.convertEndpointToCenterParameterization(x1, y1, cpx, cpy, fa, fs, rx, ry, psi);
                    break;
                case 'a':
                    rx = p.shift();
                    ry = p.shift();
                    psi = p.shift();
                    fa = p.shift();
                    fs = p.shift();
                    x1 = cpx;
                    y1 = cpy;
                    cpx += p.shift();
                    cpy += p.shift();
                    cmd = 'A';
                    points = this.convertEndpointToCenterParameterization(x1, y1, cpx, cpy, fa, fs, rx, ry, psi);
                    break;
                default:
                    break;
            }
            ca.push({
                command: cmd || c,
                points: points,
                start: {
                    x: startX,
                    y: startY
                },
                pathLength: calcLength(startX, startY, cmd || c, points)
            });
        }
        if (c === 'z' || c === 'Z') {
            ca.push({
                command: 'z',
                points: [],
                start: undefined,
                pathLength: 0
            });
        }
    }

    return ca;
};

export default parsePathData;
