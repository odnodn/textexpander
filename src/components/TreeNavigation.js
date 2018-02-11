import React, { Component } from 'react'
import SortableTree from 'react-sortable-tree'
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer'

export default class TreeNavigation extends Component
{
  constructor(props) {
    super(props)
    this.state = {
      treeData: props.treeData
    }

    this.onChange = this.onChange.bind(this)
  }

  onChange(treeData) {
    this.setState({ treeData })
  }

  render() {
    return (
      <div style={{ height: 300 }}>
        <SortableTree
          treeData={this.state.treeData}
          onChange={this.onChange}
          theme={FileExplorerTheme}
        />
      </div>
    )
  }

}
