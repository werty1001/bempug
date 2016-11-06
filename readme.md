[BEM]: https://en.bem.info/
[Pug]: https://pugjs.org/
[original idea]: https://github.com/kizu/bemto

# BemPug — some [Pug][] mixins for writing code on [BEM][] methodology
Many thanks to Roman Komarov for the [original idea][].

### Anchors
[Install](#1-install) | [Mixins](#2-mixins) | [Use](#3-use) | [Settings](#4-settings)

## 1. Install

Install from npm:

```Pug
npm i bempug --save-dev
```
Then include `index.pug` file to your project:
```Pug
include ../../node_modules/bempug/index
```

## 2. Mixins

```Pug
//- Block
mixin b(name, data, tag) 

//- Element
mixin e(name, data, tag)
```
|  Mixin argument  | Valid type  |
|---|---|
| name | string  |
| data | string / array / object |
| tag  | string  |

If data argument is string or array it will be modifier, also data can be object:
```Pug
{m: 'modifier', e: 'element', em: 'element_modifier'  }
```
- data.m (array or string) for modifiers
- data.e (array or string or bool) for mix block with element
- data.em (array or string) for element modifiers if block have mix

## 3. Use
**Simple example:**

```Pug
+b('myblock')
  +e('el') Element text
```

Output:

```HTML
<div class="myblock">
    <div class="myblock__el">Element text</div>
</div>
```
**Block and element have modifiers:**

```Pug
+b('btn', ['big','disabled'], 'button')
    +e('text', 'bold') Text
```

Output:

```HTML
<button class="btn btn--big btn--disabled">
    <span class="btn__text btn__text--bold">Text</span>
</button>
```

**Block and element mix**

```Pug
+b('title', {e: 'article'}, 'h1') Title

+b('title', {e: ['article','content']}, 'h2') Title 2

+b('title', {e: 'article|my-title-name'}, 'h3') Title 3
```

Output:

```HTML
<h1 class="title article__title">Title</h1>

<h2 class="title article__title content__title">Title 2</h2>

<h3 class="title article__my-title-name">Title 3</h3>
```

**Simple nav**

```Pug
+b('nav', {e: 'header'}, 'ul')
	+e('item')
		+b( 'link', {e: true}, 'a' ) Link
	+e('item')
		+b( 'link', {}, 'a' ) Link
	+e('item')
		+b( 'link', {e: true, m: 'with-icon'}, 'a' )
			+b( 'icon', {e: true} )
			| Link
```

Output:

```HTML
<ul class="nav header__nav">
    <li class="nav__item">
        <a class="link nav__link">Link</a>
    </li>
    <li class="nav__item">
        <a class="link">Link</a>
    </li>
    <li class="nav__item">
        <a class="link nav__link link--with-icon">
            <span class="icon link__icon"></span>
            Link
        </a>
    </li>
</ul>
```

**Block and element mix with modifiers:**

```Pug
+b('title', {e: 'article', m: ['uppercase','size-xll']}, 'h1') Title

+b('title', {e: ['article','content'], m: 'with-line'}, 'h2') Title 2

+b('title', {e: 'article|my-title', m: 'size-s', em: 'lowercase'}, 'h3') Title 3
```

Output:

```HTML
<h1 class="title article__title title--uppercase title--size-xll">Title</h1>

<h2 class="title article__title content__title title--with-line">Title 2</h2>

<h3 class="title article__my-title title--size-s article__my-title--lowercase">Title 3</h3>

```

## 4. Settings
You can change separators, example:

```Pug
- BEMPUG.modifier = '--';
- BEMPUG.element = '__';
```