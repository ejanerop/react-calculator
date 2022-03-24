import {Component} from "react";
import "./App.scss";

const isOperator = /[x/+-]/,
    endsWithOperator = /[x+-/]$/,
    endsWithNegativeSign = /\d[x/+-]{1}-$/;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentVal: "0",
            prevVal: "0",
            formula: "",
        };
        this.handleOperators = this.handleOperators.bind(this);
        this.handleEvaluate = this.handleEvaluate.bind(this);
        this.initialize = this.initialize.bind(this);
        this.handleDecimal = this.handleDecimal.bind(this);
        this.handleNumbers = this.handleNumbers.bind(this);
    }

    handleEvaluate() {
        let expression = this.state.formula;
        while (endsWithOperator.test(expression)) {
            expression = expression.slice(0, -1);
        }
        expression = expression.replace(/x/g, "*").replace(/-/g, "-");
        let answer =
            Math.round(1000000000000 * eval(expression)) / 1000000000000;
        this.setState({
            currentVal: answer.toString(),
            formula:
                expression
                    .replace(/-/g, "-")
                    .replace(/(x|\/|\+)-/, "$1-")
                    .replace(/^-/, "-") +
                "=" +
                answer,
            prevVal: answer,
            evaluated: true,
        });
    }

    handleOperators(e) {
        const value = e.target.value;
        const {formula, prevVal, evaluated} = this.state;
        this.setState({currentVal: value, evaluated: false});
        if (evaluated) {
            this.setState({formula: prevVal + value});
        } else if (!endsWithOperator.test(formula)) {
            this.setState({
                prevVal: formula,
                formula: formula + value,
            });
        } else if (!endsWithNegativeSign.test(formula)) {
            this.setState({
                formula:
                    (endsWithNegativeSign.test(formula + value)
                        ? formula
                        : prevVal) + value,
            });
        } else if (value !== "-") {
            this.setState({
                formula: prevVal + value,
            });
        }
    }

    handleNumbers(e) {
        const {currentVal, formula, evaluated} = this.state;
        const value = e.target.value;
        this.setState({evaluated: false});
        if (evaluated) {
            this.setState({
                currentVal: value,
                formula: value !== "0" ? value : "",
            });
        } else {
            this.setState({
                currentVal:
                    currentVal === "0" || isOperator.test(currentVal)
                        ? value
                        : currentVal + value,
                formula:
                    currentVal === "0" && value === "0"
                        ? formula === ""
                            ? value
                            : formula
                        : /([^.0-9]0|^0)$/.test(formula)
                        ? formula.slice(0, -1) + value
                        : formula + value,
            });
        }
    }

    handleDecimal() {
        if (this.state.evaluated === true) {
            this.setState({
                currentVal: "0.",
                formula: "0.",
                evaluated: false,
            });
        } else if (
            !this.state.currentVal.includes(".") &&
            !this.state.currentVal.includes("Limit")
        ) {
            this.setState({evaluated: false});
            if (
                endsWithOperator.test(this.state.formula) ||
                (this.state.currentVal === "0" && this.state.formula === "")
            ) {
                this.setState({
                    currentVal: "0.",
                    formula: this.state.formula + "0.",
                });
            } else {
                this.setState({
                    currentVal:
                        this.state.formula.match(/(-?\d+\.?\d*)$/)[0] + ".",
                    formula: this.state.formula + ".",
                });
            }
        }
    }

    initialize() {
        this.setState({
            currentVal: "0",
            prevVal: "0",
            formula: "",
            evaluated: false,
        });
    }

    render() {
        return (
            <div className="App">
                <div className="calculator">
                    <div className="calculator-display">
                        <div className="display-formula">
                            {this.state.formula}
                        </div>
                        <div className="display-value" id="display">
                            {this.state.currentVal}
                        </div>
                    </div>
                    <div className="calculator-keys">
                        <div className="calculator-keys-row">
                            <button
                                className="calculator-key key-clear key-operator"
                                id="clear"
                                onClick={this.initialize}>
                                AC
                            </button>
                            <button
                                className="calculator-key key-divide key-operator"
                                id="divide"
                                onClick={this.handleOperators}
                                value="/">
                                /
                            </button>
                            <button
                                className="calculator-key key-multiply key-operator"
                                id="multiply"
                                onClick={this.handleOperators}
                                value="x">
                                x
                            </button>
                        </div>
                        <div className="calculator-keys-row">
                            <button
                                className="calculator-key key-7"
                                id="seven"
                                onClick={this.handleNumbers}
                                value="7">
                                7
                            </button>
                            <button
                                className="calculator-key key-8"
                                id="eight"
                                onClick={this.handleNumbers}
                                value="8">
                                8
                            </button>
                            <button
                                className="calculator-key key-9"
                                id="nine"
                                onClick={this.handleNumbers}
                                value="9">
                                9
                            </button>
                            <button
                                className="calculator-key key-subtract key-operator"
                                id="subtract"
                                onClick={this.handleOperators}
                                value="-">
                                -
                            </button>
                        </div>
                        <div className="calculator-keys-row">
                            <button
                                className="calculator-key key-4"
                                id="four"
                                onClick={this.handleNumbers}
                                value="4">
                                4
                            </button>
                            <button
                                className="calculator-key key-5"
                                id="five"
                                onClick={this.handleNumbers}
                                value="5">
                                5
                            </button>
                            <button
                                className="calculator-key key-6"
                                id="six"
                                onClick={this.handleNumbers}
                                value="6">
                                6
                            </button>
                            <button
                                className="calculator-key key-add key-operator"
                                id="add"
                                onClick={this.handleOperators}
                                value="+">
                                +
                            </button>
                        </div>
                        <div className="calculator-keys-row">
                            <button
                                className="calculator-key key-1"
                                id="one"
                                onClick={this.handleNumbers}
                                value="1">
                                1
                            </button>
                            <button
                                className="calculator-key key-2"
                                id="two"
                                onClick={this.handleNumbers}
                                value="2">
                                2
                            </button>
                            <button
                                className="calculator-key key-3"
                                id="three"
                                onClick={this.handleNumbers}
                                value="3">
                                3
                            </button>
                            <button
                                className="calculator-key key-equals"
                                id="equals"
                                onClick={this.handleEvaluate}
                                value="=">
                                =
                            </button>
                        </div>
                        <div className="calculator-keys-row">
                            <button
                                className="calculator-key key-0"
                                id="zero"
                                onClick={this.handleNumbers}
                                value="0">
                                0
                            </button>
                            <button
                                className="calculator-key key-decimal"
                                id="decimal"
                                onClick={this.handleDecimal}
                                value=".">
                                .
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
