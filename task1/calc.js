const form = document.querySelector('#form');
const res = document.getElementById('result');
const input = document.querySelector('#inputfield');
let err = true;
let resArr = [];
let resIter = 0;
let enter = false;

form.addEventListener('submit', (e) => e.preventDefault())

const del = (input) => {
    const temp = input.value;
    input.value = temp.slice(0, temp.length - 1);
}

const clear = (input, res) => {
    input.value = '';
    res.innerHTML = '&nbsp;';
}

const printAns = (input, res) => {
    try {
        if (resArr.length !== 0) {
            input.value = resArr[resIter].in;
            res.innerHTML = resArr[resIter].res;
            console.log(resIter)
            resIter++
        }
        else {
            res.innerHTML = 'no more data!';
        }
    }
    catch (e) {
        clear(input, res);
    }
}

const operation = (n1, op, n2) => {
    switch (op) {
        case '+': return n1 + n2;
        case '−': return n1 - n2;
        case '×': return n1 * n2;
        case '÷': return n1 / n2;
        case '%': return n1 / 100;
        case '√': return Math.sqrt(n1);
        default: return 'syntax error!';
    }
}

const evaluation = (nums, op) => {
    while (nums.length !== 0 && op.length !== 0) {
        // console.log('parathesis handling')
        if ((op[0] === '(') || (op[1] === '(')) {
            let prev = 0;
            let prevop = ''
            if (op[1] === '(') {
                prev = nums[0];
                prevop = op[0];
                op.shift();
                nums.shift();
            }
            let count = 0;
            let tempNums = []
            let tempOp = []
            let n, i, j = 0;
            for (i = 0; i < op.length; i++) {
                if (op[i] === '(') {
                    count++;
                    continue;
                }
                else if (op[i] === ')') {
                    count--;
                    if (count == 0) {
                        n = evaluation(tempNums, tempOp);
                        break;
                    }
                    continue;
                }
                tempNums.push(nums[j]);
                tempNums.push(nums[j + 1]);
                j++;
                tempOp.push(op[i]);
            }
            if (count !== 0)
                return 'syntax error!';
            if (prev !== 0) {
                nums.splice(0, (j * 2), prev, n);
                op.splice(0, j + 2, prevop);
            }
            else {
                nums.splice(0, (j * 2), n);
                op.splice(0, j + 2);
            }
            continue;
        }
        // console.log('plus/minushandling')
        if (op[0] === '±') {
            let re = [];
            let t = [...nums];
            if (nums.length === 1) {
                re.push(parseInt(nums[0]));
                re.push('-' + parseInt(nums[0]));
                return `${re[0]},${re[1]}`;
            }
            op.shift();
            op.unshift('+');
            re.push(evaluation(nums, op));
            op.shift();
            op.unshift('−');
            re.push(evaluation(t, op));
            return re;

        }
        let tempRes = operation(parseFloat(nums[0]), op[0], parseFloat(nums[1]));
        if (op[0] === '√') {
            nums.shift();
            op.shift();
            nums.unshift(tempRes);
        }
        else if (!Number.isNaN(tempRes)) {
            nums.shift();
            nums.shift();
            nums.unshift(tempRes);
            op.shift();
        }
        else {
            return "math error!";
        }
    }
    if (nums.length === 1 && op.length === 0)
        return nums[0];
    else
        return "syntax error!";
}

const divideNums = (exp) => {
    let nums = [];
    let op = [];
    let n = '';
    for (i of exp) {
        if (i === '∙')
            n += '.';
        else if (!Number.isInteger(parseInt(i))) {
            op.push(i);
            if (n !== '')
                nums.push(n);
            n = '';
            continue;
        }
        else
            n += i;
    }
    if (n !== '')
        nums.push(n);
    return evaluation(nums, op);
}

const result = (exp) => {
    enter = true;
    return divideNums(exp);
}

const btnClick = (e) => {
    switch (e.innerText) {
        case 'ans': printAns(input, res); break;
        case 'del': del(input); break;
        case 'clear': clear(input, res); break;
        case '%':
            let r = operation(parseInt(res.innerText), '%', '');
            if (Number.isNaN(r))
                res.innerHTML = "math error!";
            else
                res.innerHTML = r;
            break;
        case 'ENTER':
            let r1 = result(input.value);
            if (Array.isArray(r1)) {
                if ((!Number.isNaN(r1[0]) || !Number.isNaN(r1[1])) && err) {
                    err = false;
                    res.innerHTML = r1[0];
                    resArr.push({ in: input.value, res: r1[0] });
                }
                else {
                    res.innerHTML = `${re[0]},${re[1]}`;
                    resArr.push({ in: input.value, res: `${re[0]},${re[1]}` });
                }
            }
            else if (typeof r1 === 'number' && !Number.isInteger(r1) && !Number.isNaN(r1)) {
                let temp = [...`${r1}`];
                let t = temp.splice(0, 10).join('');
                res.innerHTML = t;
                resArr.push({ in: input.value, res: t });
            }
            else {
                res.innerHTML = r1;
                resArr.push({ in: input.value, res: r1 });
            }
            break;
        case e.innerText:
            if (enter) {
                clear(input, res);
                enter = false;
            }
            input.value += e.innerText;
            break;
        default: break;
    }
}