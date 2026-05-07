class Calculator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      display: "0",
      formula: "",
      evaluated: false
    };

    this.handleNumber = this.handleNumber.bind(this);
    this.handleOperator = this.handleOperator.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
    this.handleEquals = this.handleEquals.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  endsWithOperator(value) {
    return /[+\-*/]$/.test(value);
  }

  endsWithNegativeSign(value) {
    return /[+\-*/]-$/.test(value);
  }

  getCurrentNumber(formula) {
    const parts = formula.split(/[+\-*/]/);
    return parts[parts.length - 1];
  }

  formatResult(result) {
    if (!Number.isFinite(result)) {
      return "Error";
    }

    return parseFloat(result.toFixed(12)).toString();
  }

  handleNumber(number) {
    const { display, formula, evaluated } = this.state;

    if (evaluated) {
      this.setState({
        display: number,
        formula: number,
        evaluated: false
      });
      return;
    }

    if (display === "0" && number === "0" && formula === "") {
      return;
    }

    if (
      display === "0" &&
      number !== "0" &&
      (formula === "" || this.endsWithOperator(formula))
    ) {
      this.setState({
        display: number,
        formula: formula === "" ? number : formula + number
      });
      return;
    }

    if (display === "0" && number !== "0") {
      this.setState({
        display: number,
        formula: formula.slice(0, -1) + number
      });
      return;
    }

    this.setState({
      display: display === "0" ? number : display + number,
      formula: formula + number
    });
  }

  handleOperator(operator) {
    const { display, formula, evaluated } = this.state;

    if (formula === "" && operator !== "-") {
      return;
    }

    if (formula === "" && operator === "-") {
      this.setState({
        display: "-",
        formula: "-",
        evaluated: false
      });
      return;
    }

    if (evaluated) {
      this.setState({
        formula: display + operator,
        display: operator,
        evaluated: false
      });
      return;
    }

    if (this.endsWithNegativeSign(formula)) {
      if (operator === "-") {
        return;
      }

      this.setState({
        formula: formula.slice(0, -2) + operator,
        display: operator
      });
      return;
    }

    if (this.endsWithOperator(formula)) {
      if (operator === "-") {
        this.setState({
          formula: formula + operator,
          display: operator
        });
      } else {
        this.setState({
          formula: formula.slice(0, -1) + operator,
          display: operator
        });
      }

      return;
    }

    this.setState({
      formula: formula + operator,
      display: operator
    });
  }

  handleDecimal() {
    const { display, formula, evaluated } = this.state;

    if (evaluated) {
      this.setState({
        display: "0.",
        formula: "0.",
        evaluated: false
      });
      return;
    }

    const currentNumber = this.getCurrentNumber(formula);

    if (currentNumber.includes(".")) {
      return;
    }

    if (formula === "" || this.endsWithOperator(formula)) {
      this.setState({
        display: "0.",
        formula: formula + "0."
      });
      return;
    }

    this.setState({
      display: display + ".",
      formula: formula + "."
    });
  }

  handleEquals() {
    let formula = this.state.formula;

    if (formula === "") {
      return;
    }

    while (this.endsWithOperator(formula)) {
      formula = formula.slice(0, -1);
    }

    try {
      const result = this.formatResult(Function("return " + formula)());

      this.setState({
        display: result,
        formula: result,
        evaluated: true
      });
    } catch (error) {
      this.setState({
        display: "Error",
        formula: "",
        evaluated: true
      });
    }
  }

  handleClear() {
    this.setState({
      display: "0",
      formula: "",
      evaluated: false
    });
  }

  render() {
    return (
      <div className="calculator">
        <div id="display">{this.state.display}</div>

        <div className="buttons">
          <button id="clear" onClick={this.handleClear}>
            AC
          </button>

          <button id="divide" className="operator" onClick={() => this.handleOperator("/")}>
            /
          </button>

          <button id="multiply" className="operator" onClick={() => this.handleOperator("*")}>
            x
          </button>

          <button id="seven" onClick={() => this.handleNumber("7")}>
            7
          </button>

          <button id="eight" onClick={() => this.handleNumber("8")}>
            8
          </button>

          <button id="nine" onClick={() => this.handleNumber("9")}>
            9
          </button>

          <button id="subtract" className="operator" onClick={() => this.handleOperator("-")}>
            -
          </button>

          <button id="four" onClick={() => this.handleNumber("4")}>
            4
          </button>

          <button id="five" onClick={() => this.handleNumber("5")}>
            5
          </button>

          <button id="six" onClick={() => this.handleNumber("6")}>
            6
          </button>

          <button id="add" className="operator" onClick={() => this.handleOperator("+")}>
            +
          </button>

          <button id="one" onClick={() => this.handleNumber("1")}>
            1
          </button>

          <button id="two" onClick={() => this.handleNumber("2")}>
            2
          </button>

          <button id="three" onClick={() => this.handleNumber("3")}>
            3
          </button>

          <button id="equals" onClick={this.handleEquals}>
            =
          </button>

          <button id="zero" onClick={() => this.handleNumber("0")}>
            0
          </button>

          <button id="decimal" onClick={this.handleDecimal}>
            .
          </button>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Calculator />, document.getElementById("root"));
