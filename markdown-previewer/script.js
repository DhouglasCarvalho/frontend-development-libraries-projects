const defaultMarkdown = `# Markdown Previewer

## This is a subheading

Here is a [link](https://www.freecodecamp.org).

Here is some inline code: \`const x = 10;\`

Here is a code block:

\`\`\`
function helloWorld() {
  return "Hello, world!";
}
\`\`\`

- First list item
- Second list item
- Third list item

> This is a blockquote.

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)

This is **bold text**.
`;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      markdown: defaultMarkdown
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      markdown: event.target.value
    });
  }

  getMarkdownText(markdown) {
    if (window.marked && window.marked.parse) {
      return window.marked.parse(markdown);
    }

    if (window.marked) {
      return window.marked(markdown);
    }

    return markdown;
  }

  render() {
    return (
      <div className="app">
        <h1 className="title">Markdown Previewer</h1>

        <div className="workspace">
          <textarea
            id="editor"
            value={this.state.markdown}
            onChange={this.handleChange}
          />

          <div
            id="preview"
            dangerouslySetInnerHTML={{
              __html: this.getMarkdownText(this.state.markdown)
            }}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
