exports.sourceNodes = ({ actions }) => {
  function createNode({
    type,
    mimeType = undefined,
    parent = null,
    children = [],
  }) {
    actions.createNode({
      id: type,
      parent,
      children,
      [type]: true,
      internal: {
        type,
        contentDigest: type,
        mediaType: mimeType,
      },
    })
  }

  createNode({
    type: `Standalone`,
  })

  createNode({
    type: `NoExtrasParent`,
    children: [`NoExtrasChild`],
  })

  createNode({
    type: `NoExtrasChild`,
    parent: `NoExtrasParent`,
  })

  createNode({
    type: `MimeParent`,
    children: [`MimeChild`],
    mimeType: `application/wat`,
  })

  createNode({
    type: `MimeChild`,
    parent: `MimeParent`,
  })

  createNode({
    type: `StandaloneSchema`,
  })

  createNode({
    type: `NoExtrasParentSchema`,
    children: [`NoExtrasChildSchema`],
  })

  createNode({
    type: `NoExtrasChildSchema`,
    parent: `NoExtrasParentSchema`,
  })

  createNode({
    type: `MimeParentSchema`,
    children: [`MimeChildSchema`],
    mimeType: `application/wat-schema`,
  })

  createNode({
    type: `MimeChildSchema`,
    parent: `MimeParentSchema`,
  })
}

exports.createSchemaCustomization = ({ actions }) => {
  actions.createTypes(`
    type MimeChildSchema implements Node @dontInfer @childOf(mimeTypes: ["application/wat-schema"]) {
  MimeChildSchema: Boolean
}

type MimeParentSchema implements Node @dontInfer @mimeTypes(types: ["application/wat-schema"]){
  MimeParentSchema: Boolean
}

type NoExtrasChildSchema implements Node @dontInfer @childOf(types: ["NoExtrasParentSchema"])  {
  NoExtrasChildSchema: Boolean
}

type NoExtrasParentSchema implements Node @dontInfer {
  NoExtrasParentSchema: Boolean
}

type StandaloneSchema implements Node @dontInfer {
  StandaloneSchema: Boolean
}
  `)
}
