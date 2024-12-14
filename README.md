# Awesome UI Library

A modern, accessible UI component library with CLI tools for easy component management and installation.

## 🚀 Features

- 📦 Ready-to-use React components
- 🎨 Tailwind CSS for styling
- 🛠️ CLI tool for component management
- 📚 Storybook documentation
- 🎯 TypeScript support
- 🎨 Customizable components with Class Variance Authority

## 📋 Prerequisites

- Node.js >= 18.0.0
- npm

## 🔧 Installation

```bash
# Install the CLI tool globally
npm install -g awesome-ui-cli

# Or use it directly with npx
npx awesome-ui-cli
```

## 🎯 Usage

### Installing Components

```bash
# Install a specific component
awesome-ui-cli add button
```

### Available Scripts

```bash
# Start the development server
npm run start

# Build the library
npm run build

# Run Storybook
npm run storybook

# Build Storybook
npm run build-storybook
```

## 🤝 Contributing

We love your input! We want to make contributing to Awesome UI as easy and transparent as possible.

### Project Structure

```
src/
├── templates/           # Component templates for CLI
│   ├── components/     # Component template files
├── stories/           # Storybook stories
└── Cli/              # CLI implementation
```

### Adding a New Component

1. **Create Component Template**
   Add your component template files in `src/templates/components/[ComponentName]/`:

   ```
   src/templates/components/[ComponentName]/
   ├── index.ts              # Main export file
   └── [ComponentName].tsx   # Component implementation
   ```

2. **Create Storybook Story**
   Add your story in `src/stories/`:

   ```
   src/stories/
   └── [ComponentName].stories.tsx  # Storybook story
   ```

3. **Component Implementation Requirements**

   - Use TypeScript for type safety
   - Implement proper accessibility features
   - Use Tailwind CSS for styling
   - Use Class Variance Authority for variants
   - Include proper JSDoc documentation
   - Add proper prop types and interfaces

4. **Register Component in CLI**
   Add your component to the CLI registry in `src/Cli/registry.ts`:

   ```typescript
   export const componentRegistry = {
     button: {
       name: "Button",
       dependencies: ["class-variance-authority"],
       templatePath: "src/templates/components/Button",
       files: ["Button.tsx", "index.ts"],
     },
     // Add your new component here
   };
   ```

5. **Testing Requirements**

   - Test all variants and props
   - Ensure responsive behavior

6. **Documentation**
   - Include usage examples
   - Document all props and variants

### Pull Request Process

1. clone the repository
2. Create a new branch (`git checkout -b feature/component-name`)
3. Make your changes
4. Update documentation
5. Submit a pull request

## 📝 License

MIT License - see the [LICENSE](LICENSE) file for details

## 👥 Authors

- Shehab Mohsen Mahmoud - [GitHub](https://github.com/shehab20089)

## 🙏 Acknowledgments

- Thanks to all contributors
- Built with [Radix UI](https://www.radix-ui.com/)
- Inspired by [shadcn/ui](https://ui.shadcn.com/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
