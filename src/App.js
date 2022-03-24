import "./App.scss";

function App() {
    return (
        <div className="App">
            <div className="calculator">
                <div className="calculator-display"></div>
                <div className="calculator-keys">
                    <div className="calculator-keys-row">
                        <button className="calculator-key key-clear key-operator">
                            AC
                        </button>
                        <button className="calculator-key key-divide key-operator">
                            /
                        </button>
                        <button className="calculator-key key-multiply key-operator">
                            *
                        </button>
                    </div>
                    <div className="calculator-keys-row">
                        <button className="calculator-key key-7">7</button>
                        <button className="calculator-key key-8">8</button>
                        <button className="calculator-key key-9">9</button>
                        <button className="calculator-key key-subtract key-operator">
                            -
                        </button>
                    </div>
                    <div className="calculator-keys-row">
                        <button className="calculator-key key-4">4</button>
                        <button className="calculator-key key-5">5</button>
                        <button className="calculator-key key-6">6</button>
                        <button className="calculator-key key-add key-operator">
                            +
                        </button>
                    </div>
                    <div className="calculator-keys-row">
                        <button className="calculator-key key-1">1</button>
                        <button className="calculator-key key-2">2</button>
                        <button className="calculator-key key-3">3</button>
                        <button className="calculator-key key-equals">=</button>
                    </div>
                    <div className="calculator-keys-row">
                        <button className="calculator-key key-0">0</button>
                        <button className="calculator-key key-decimal">
                            .
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
