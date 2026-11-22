const fs = require('fs');
const path = require('path');

const nativePath = path.join(__dirname, 'node_modules', 'rollup', 'dist', 'native.js');
if (fs.existsSync(nativePath)) {
  let content = fs.readFileSync(nativePath, 'utf8');
  if (!content.includes('@rollup/wasm-node')) {
    content = content.replace(
      'const requireWithFriendlyError = id => {\n\ttry {\n\t\treturn require(id);\n\t} catch (error) {',
      'const requireWithFriendlyError = id => {\n\ttry {\n\t\treturn require(id);\n\t} catch (error) {\n\t\ttry { return require(\'@rollup/wasm-node/dist/native.js\'); } catch(e){}'
    );
    fs.writeFileSync(nativePath, content, 'utf8');
    console.log('Patched rollup to fallback to @rollup/wasm-node');
  }
}
