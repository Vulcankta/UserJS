// ==UserScript==
// @name         网页翻译（自用修改版）
// @author       Vulcankta
// @description  给每个非中文的网页右下角（可以调整到左下角）添加一个翻译悬浮按钮，调用谷歌官方全页翻译引擎翻译整个网页；支持快捷键一键翻译、自定义目标语言、自动检测中文页面并跳过。本脚本是已删库停更的原版「网页翻译」(Kaiter-Plus, v1.68) 的衍生维护版本：采用谷歌 element.js 全页翻译方案（整页一次翻译，速度最快，跨页经 googtrans cookie 自动接力），并智能兼容页面自带谷歌翻译控件的网站（直接复用其引擎，绝不二次注入），移除了原版的赞助弹窗，新增快捷键翻译与丰富的自定义设置。
// @version      2.0
// @license      BSD-3-Clause
// @include      *://*
// @exclude      /^(http|https).*((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}/
// @exclude      /.*duyaoss\.com/
// @exclude      /.*lanzous\.com/
// @exclude      /.*w3school.*cn/
// @exclude      /.*iqiyi\.com/
// @exclude      /.*baidu.*/
// @exclude      /.*cnblogs\.com/
// @exclude      /.*csdn\.net/
// @exclude      /.*zhku\.edu\.cn/
// @exclude      /.*zhihuishu\.com/
// @exclude      /.*aliyuncs\.com/
// @exclude      /.*chaoxing\.com/
// @exclude      /.*youku\.com/
// @exclude      /.*examcoo\.com/
// @exclude      /.*mooc\.com/
// @exclude      /.*bilibili\.com/
// @exclude      /.*qq\.com/
// @exclude      /.*yy\.com/
// @exclude      /.*huya\.com/
// @exclude      /localhost/
// @exclude      /.*acfun\.cn/
// @exclude      /.*eleme\.cn/
// @exclude      /.*douyin\.com/
// @icon         data:image/png;base64,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
// @noframes
// @run-at       document-start
// @grant        GM_addStyle
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_notification
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// ==/UserScript==

;(function () {
  'use strict'
  // 重入守卫: 防止注入环境重复执行导致双 fab/双容器
  if (window.__wtLoaded) return
  window.__wtLoaded = true

  // ===== document-start 阶段: 提前隐藏所有谷歌控件 UI =====
  // 页面自带的谷歌翻译控件与本脚本注入的隐藏控件都退居幕后, 由自研悬浮按钮统一驱动,
  // 防止页面加载期控件抢跑渲染造成闪现
  ;(() => {
    const earlyCss = `
      #google_translate_element,
      #wt_google_translate_element,
      [id=":1.container"].skiptranslate,
      [id=":2.container"].skiptranslate {
        display: none !important;
      }
      #goog-gt-,
      #goog-gt-tt {
        visibility: hidden !important;
        display: none !important;
      }
      .goog-text-highlight {
        background-color: inherit !important;
        box-shadow: 0 0 0 0 transparent !important;
      }
    `
    // document-start 时 head 可能尚未解析, 延迟到其存在再注入样式
    if (document.head) GM_addStyle(earlyCss)
    else document.addEventListener('readystatechange', () => GM_addStyle(earlyCss), { once: true })
  })()

  // ===== 主逻辑: 等 window load 之后再注入完整功能 =====
  // (翻译引擎不参与页面加载期, 避免任何请求阻塞 load 事件;
  //  兜底 30s: 个别页面 load 永不触发时不至于永久失去翻译功能)
  const __wtMain = () => {

  // 菜单
  const menu = [
    {
      key: 'position',
      name: '按钮位置',
      value: true,
      showNotification: true,
      tip: {
        open: '👈',
        close: '👉'
      },
      click: setButtonPosition
    },
    {
      key: 'isCheck',
      name: '自动检测中文',
      value: true,
      showNotification: true,
      tip: {
        open: '✅',
        close: '❌'
      },
      click: null
    },
    {
      key: 'isShowTip',
      name: '显示翻译建议',
      value: false,
      showNotification: true,
      tip: {
        open: '✅',
        close: '❌'
      },
      click: setShowTip
    }
  ]

  // 保存已注册的菜单
  const munuRegister = []

  // 配置默认菜单
  menu.forEach(v => {
    if (GM_getValue(v.key) === undefined || GM_getValue(v.key) === null) GM_setValue(v.key, v.value)
  })

  // 注册菜单
  function registerMenuCommand() {
    if (munuRegister.length === menu.length) {
      munuRegister.forEach(v => {
        GM_unregisterMenuCommand(v)
      })
    }
    menu.forEach((v, i) => {
      v.value = GM_getValue(v.key)
      munuRegister[i] = GM_registerMenuCommand(`${v.value ? v.tip.open : v.tip.close} ${v.name}`, () => {
        menuSwitch(v)
      })
    })
  }

  // 切换菜单
  function menuSwitch(item) {
    // 设置数据
    item.value = !item.value
    GM_setValue(item.key, item.value)
    // 系统通知
    if (item.showNotification) {
      GM_notification({
        text: `已${item.value ? item.tip.open : item.tip.close}[${item.name}] 功能`,
        title: '网页翻译',
        timeout: 1000
      })
    }
    // 如果有点击事件，执行
    if (item.click) item.click()
    // 重新注册
    registerMenuCommand()
  }

  // 获取 head
  const head = document.head
  // 获取body
  const body = document.body
  // 获取当前页面的语言
  const lang = document.documentElement.lang
  // 获取网页的标题
  const pageTitle = document.title
  // 获取网页使用的主要语言
  const mainLang = document.characterSet.toLowerCase()

  // 判断是不是中文网页
  function isChinesePage() {
    return (
      GM_getValue('isCheck') &&
      (lang.substring(0, 2) === 'zh' || mainLang.substring(0, 2) === 'gb' || /[\u4E00-\u9FFF]/.test(pageTitle))
    )
  }

  // 位置信息样式
  let positionStyle = null
  // 设置按钮位置
  function setButtonPosition() {
    if (positionStyle) positionStyle.parentNode.removeChild(positionStyle)
    positionStyle = GM_addStyle(`
      #wt-fab {
        ${GM_getValue('position') ? 'left' : 'right'}: 0;
        transform: translateX(${GM_getValue('position') ? '-' : ''}55%);
      }
      @media handheld, only screen and (max-width: 768px) {
        #wt-fab {
          transform: translateX(${GM_getValue('position') ? '-' : ''}40%);
        }
      }
    `)
  }

  // 显示翻译建议信息
  let tipStyle = null
  function setShowTip() {
    if (tipStyle) tipStyle.parentNode.removeChild(tipStyle)
    tipStyle = GM_addStyle(`
      #goog-gt-,
      #goog-gt-tt {
        visibility: ${GM_getValue('isShowTip') ? 'visible' : 'hidden!important'};
        display: ${GM_getValue('isShowTip') ? 'block' : 'none!important'};
      }
      .goog-text-highlight {
        background-color: ${GM_getValue('isShowTip') ? '#c9d7f1' : 'inherit!important'};
        box-shadow: ${GM_getValue('isShowTip') ? '2 2 4 #99a' : '0 0 0 0 transparent!important'};
      }
    `)
  }

  // 注册菜单
  registerMenuCommand()

  // ===== 快捷键翻译 =====
  // 全部支持语言(菜单清单与目标语言下拉共用)
  const HOTKEY_LANGS =
    'zh-CN,zh-TW,yue,en,ja,ko,fr,de,es,pt,it,ru,ar,hi,th,vi,id,ms,tr,nl,pl,sv,el,iw,cs,hu,fi,da,no,uk,bn'
  const hotkeyLangs = HOTKEY_LANGS.split(',')
  const langNames = {
    'zh-CN': '简体中文',
    'zh-TW': '繁體中文',
    yue: '粵語（Cantonese）',
    en: 'English（英语）',
    ja: '日本語（日语）',
    ko: '한국어（韩语）',
    fr: 'Français（法语）',
    de: 'Deutsch（德语）',
    es: 'Español（西班牙语）',
    pt: 'Português（葡萄牙语）',
    it: 'Italiano（意大利语）',
    ru: 'Русский（俄语）',
    ar: 'العربية（阿拉伯语）',
    hi: 'हिन्दी（印地语）',
    th: 'ไทย（泰语）',
    vi: 'Tiếng Việt（越南语）',
    id: 'Bahasa Indonesia（印尼语）',
    ms: 'Bahasa Melayu（马来语）',
    tr: 'Türkçe（土耳其语）',
    nl: 'Nederlands（荷兰语）',
    pl: 'Polski（波兰语）',
    sv: 'Svenska（瑞典语）',
    el: 'Ελληνικά（希腊语）',
    iw: 'עברית（希伯来语）',
    cs: 'Čeština（捷克语）',
    hu: 'Magyar（匈牙利语）',
    fi: 'Suomi（芬兰语）',
    da: 'Dansk（丹麦语）',
    no: 'Norsk（挪威语）',
    uk: 'Українська（乌克兰语）',
    bn: 'বাংলা（孟加拉语）'
  }

  function getHotkey() {
    return GM_getValue('hotkey') || 'alt+t'
  }
  function getTargetLang() {
    return GM_getValue('targetLang') || 'zh-CN'
  }
  // 用户自定义的左/右下角语言菜单清单
  // 默认: 简繁中文 + 粤语 + 联合国其它官方语言(英法西俄阿)
  const DEFAULT_CUSTOM_LANGS = ['zh-CN', 'zh-TW', 'yue', 'en', 'fr', 'es', 'ru', 'ar']
  function getCustomLangs() {
    let v = GM_getValue('customLangs')
    if (typeof v === 'string') {
      try { v = JSON.parse(v) } catch (e) { v = null }
    }
    if (!Array.isArray(v)) return DEFAULT_CUSTOM_LANGS.slice()
    const valid = v.filter(c => hotkeyLangs.includes(c))
    return valid.length ? valid : DEFAULT_CUSTOM_LANGS.slice()
  }
  function setCustomLangs(list) {
    GM_setValue('customLangs', list)
  }
  // 目标语言需要落在自定义清单内
  function getEffectiveTargetLang() {
    const custom = getCustomLangs()
    const target = getTargetLang()
    return custom.includes(target) ? target : custom[0]
  }

  // 快捷键开关状态: markActive 内部维护(翻译即 true), 避免依赖菜单预高亮类
  let hotkeyTranslated = false
  let restoreOriginalFn = null

  // ===== 翻译引擎: 谷歌 element.js 全页翻译 =====
  // 引擎接入在主逻辑内完成(页面自带控件优先复用, 无自带才注入), 此处只放开关入口。
  // 触发快捷键翻译: 已翻译则恢复原文, 否则点击自研控件对应语言项;
  // fab 尚未构建时(主逻辑未跑)退化为直接驱动页面上任一谷歌 select
  function triggerHotkeyTranslate() {
    if (hotkeyTranslated) {
      if (restoreOriginalFn) restoreOriginalFn()
      return
    }
    const code = getEffectiveTargetLang()
    const item = document.querySelector('.wt-fab-item[data-code="' + code + '"]')
    if (item) {
      item.click()
      return
    }
    const combo = document.querySelector('.goog-te-combo')
    if (!combo || !combo.querySelector('option[value="' + code + '"]')) {
      GM_notification({ text: '当前页面没有翻译组件，无法快捷翻译', title: '网页翻译', timeout: 1500 })
      return
    }
    combo.value = code
    combo.dispatchEvent(new Event('change', { bubbles: true }))
  }

  // 快捷键捕获状态
  let capturing = false

  // 设置弹窗 UI
  let htInput = null
  function closeHotkeyDialog() {
    capturing = false
    document.querySelector('.ht-settings-mask')?.remove()
    htInput = null
    registerHotkeyMenus()
  }
  function startCaptureHotkey() {
    capturing = true
    if (htInput) htInput.value = '请按下新的快捷键组合…'
  }
  function openHotkeyDialog() {
    closeHotkeyDialog()
    const mask = document.createElement('div')
    mask.className = 'ht-settings-mask notranslate'
    const panel = document.createElement('div')
    panel.className = 'ht-settings-panel'
    const title = document.createElement('div')
    title.className = 'ht-settings-title'
    title.textContent = '更多设置'
    const close = document.createElement('div')
    close.className = 'ht-settings-close'
    close.textContent = '×'
    close.onclick = closeHotkeyDialog
    const row = document.createElement('div')
    row.className = 'ht-settings-row'
    htInput = document.createElement('input')
    htInput.className = 'ht-settings-input'
    htInput.readOnly = true
    htInput.value = getHotkey().split('+').join(' + ')
    const btn = document.createElement('button')
    btn.className = 'ht-settings-btn'
    btn.textContent = '设置'
    btn.onclick = startCaptureHotkey
    row.appendChild(htInput)
    row.appendChild(btn)
    // 目标语言选择（范围 = 自定义清单）
    let langSelect = null
    const buildLangSelect = () => {
      langSelect = document.createElement('select')
      langSelect.className = 'ht-settings-select'
      getCustomLangs().forEach(code => {
        const opt = document.createElement('option')
        opt.value = code
        opt.textContent = langNames[code] || code
        if (code === getEffectiveTargetLang()) opt.selected = true
        langSelect.appendChild(opt)
      })
      langSelect.onchange = () => {
        GM_setValue('targetLang', langSelect.value)
        registerHotkeyMenus()
        GM_notification({ text: '快捷键目标语言已切换为：' + (langNames[langSelect.value] || langSelect.value), title: '网页翻译', timeout: 1500 })
      }
    }
    buildLangSelect()
    const langRow = document.createElement('div')
    langRow.className = 'ht-settings-row'
    const langLabel = document.createElement('span')
    langLabel.className = 'ht-settings-label'
    langLabel.textContent = '目标语言'
    langRow.appendChild(langLabel)
    langRow.appendChild(langSelect)
    // 自定义左/右下角语言菜单清单（双列表拖拽: 左=全部语言, 右=已选顺序）
    const customTitle = document.createElement('div')
    customTitle.className = 'ht-settings-section'
    customTitle.textContent = '左/右下角语言菜单（从左侧拖到右侧添加，右侧可拖动调整顺序，拖回左侧移除）'
    const rebuildLangSelect = () => {
      const newVal = getEffectiveTargetLang()
      const newSelect = langSelect.cloneNode(false)
      getCustomLangs().forEach(code => {
        const opt = document.createElement('option')
        opt.value = code
        opt.textContent = langNames[code] || code
        if (code === newVal) opt.selected = true
        newSelect.appendChild(opt)
      })
      newSelect.onchange = langSelect.onchange
      langRow.replaceChild(newSelect, langSelect)
      langSelect = newSelect
    }
    let dragCode = null
    let dragFromRight = false
    const allList = document.createElement('div')
    allList.className = 'ht-lang-list'
    const selList = document.createElement('div')
    selList.className = 'ht-lang-list'
    const allWrap = document.createElement('div')
    allWrap.className = 'ht-lang-col'
    const allLabel = document.createElement('div')
    allLabel.className = 'ht-lang-label'
    allLabel.textContent = '全部语言'
    allWrap.appendChild(allLabel)
    allWrap.appendChild(allList)
    const selWrap = document.createElement('div')
    selWrap.className = 'ht-lang-col'
    const selLabel = document.createElement('div')
    selLabel.className = 'ht-lang-label'
    selLabel.textContent = '已选语言（自上而下显示）'
    selWrap.appendChild(selLabel)
    selWrap.appendChild(selList)
    const langLists = document.createElement('div')
    langLists.className = 'ht-lang-lists'
    langLists.appendChild(allWrap)
    langLists.appendChild(selWrap)

    const makeItem = (code, inRight) => {
      const item = document.createElement('div')
      item.className = 'ht-lang-item' + (inRight ? ' ht-lang-active' : '')
      item.draggable = true
      item.dataset.code = code
      item.textContent = langNames[code] || code
      item.addEventListener('dragstart', e => {
        dragCode = code
        dragFromRight = inRight
        e.dataTransfer.setData('text/plain', code)
        e.dataTransfer.effectAllowed = 'move'
        item.classList.add('ht-dragging')
      })
      item.addEventListener('dragend', () => {
        item.classList.remove('ht-dragging')
        dragCode = null
      })
      return item
    }

    const persistSelection = selected => {
      // 至少保留一种语言
      if (!selected.length) {
        GM_notification({ text: '至少需要保留一种语言', title: '网页翻译', timeout: 1500 })
        refreshLists()
        return false
      }
      setCustomLangs(selected)
      // 目标语言被移除时回退到清单第一项
      if (!selected.includes(getTargetLang())) GM_setValue('targetLang', selected[0])
      rebuildLangSelect()
      registerHotkeyMenus()
      GM_notification({ text: '已保存，刷新页面后左/右下角菜单生效', title: '网页翻译', timeout: 2000 })
      refreshLists()
      return true
    }

    const refreshLists = () => {
      const selected = getCustomLangs()
      allList.innerHTML = ''
      selList.innerHTML = ''
      hotkeyLangs.forEach(code => {
        const item = makeItem(code, false)
        if (selected.includes(code)) item.classList.add('ht-lang-selected')
        allList.appendChild(item)
      })
      selected.forEach(code => {
        const item = makeItem(code, true)
        // 右侧条目: 拖到其它条目上按位置插入
        item.addEventListener('dragover', e => e.preventDefault())
        item.addEventListener('drop', e => {
          e.preventDefault()
          e.stopPropagation()
          if (!dragCode) return
          let selected2 = getCustomLangs()
          if (dragFromRight) selected2 = selected2.filter(c => c !== dragCode)
          else if (selected2.includes(dragCode)) { refreshLists(); return }
          const rect = item.getBoundingClientRect()
          const after = e.clientY > rect.top + rect.height / 2
          let idx = selected2.indexOf(code)
          if (after) idx += 1
          selected2.splice(idx, 0, dragCode)
          persistSelection(selected2)
        })
        selList.appendChild(item)
      })
    }

    selList.addEventListener('dragover', e => e.preventDefault())
    selList.addEventListener('drop', e => {
      e.preventDefault()
      if (!dragCode) return
      let selected = getCustomLangs()
      if (dragFromRight) selected = selected.filter(c => c !== dragCode).concat(dragCode)
      else {
        if (selected.includes(dragCode)) { refreshLists(); return }
        selected = selected.concat(dragCode)
      }
      persistSelection(selected)
    })
    allList.addEventListener('dragover', e => e.preventDefault())
    allList.addEventListener('drop', e => {
      e.preventDefault()
      // 拖回左侧 = 从清单移除
      if (!dragCode || !dragFromRight) { refreshLists(); return }
      persistSelection(getCustomLangs().filter(c => c !== dragCode))
    })
    refreshLists()
    const tip = document.createElement('div')
    tip.className = 'ht-settings-tip'
    tip.textContent = '点击「设置」后按下新的快捷键组合（需包含 Ctrl/Shift/Alt），Esc 取消'
    // 恢复默认设置(仅本弹窗内的设置项)
    const footer = document.createElement('div')
    footer.className = 'ht-settings-footer'
    const resetBtn = document.createElement('button')
    resetBtn.type = 'button'
    resetBtn.className = 'ht-settings-mini-btn'
    resetBtn.textContent = '恢复默认设置'
    resetBtn.onclick = () => {
      GM_setValue('hotkey', 'alt+t')
      GM_setValue('targetLang', 'zh-CN')
      GM_setValue('customLangs', DEFAULT_CUSTOM_LANGS.slice())
      htInput.value = getHotkey().split('+').join(' + ')
      rebuildLangSelect()
      refreshLists()
      registerHotkeyMenus()
      GM_notification({ text: '已恢复默认设置，刷新页面后左/右下角菜单生效', title: '网页翻译', timeout: 2000 })
    }
    footer.appendChild(resetBtn)
    panel.appendChild(title)
    panel.appendChild(close)
    panel.appendChild(row)
    panel.appendChild(langRow)
    panel.appendChild(customTitle)
    panel.appendChild(langLists)
    panel.appendChild(footer)
    panel.appendChild(tip)
    mask.appendChild(panel)
    mask.onclick = e => { if (e.target === mask) closeHotkeyDialog() }
    document.body.appendChild(mask)
  }

  // 注册「更多设置」菜单命令(关闭弹窗后重注册刷新)
  let hotkeyMenuIds = []
  function registerHotkeyMenus() {
    hotkeyMenuIds.forEach(id => GM_unregisterMenuCommand(id))
    hotkeyMenuIds = [
      GM_registerMenuCommand('🎯 更多设置', openHotkeyDialog)
    ]
  }
  registerHotkeyMenus()

  // 设置弹窗样式
  GM_addStyle(`
    .ht-settings-mask {
      position: fixed;
      inset: 0;
      z-index: 2147483647;
      background: rgba(0, 0, 0, .35);
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 16px;
      box-sizing: border-box;
    }
    .ht-settings-panel {
      position: relative;
      width: 100%;
      max-width: 570px;
      max-height: 100%;
      overflow-y: auto;
      padding: 16px;
      /* 注意: 此处刻意不用 border-radius —— 部分显卡驱动/Edge 组合下
         大面积圆角图层会导致整层 alpha 混合异常(面板变半透明)。
         will-change 强制提升为独立合成层, 修复该混合 bug */
      will-change: transform;
      background: #fff;
      box-shadow: 0 4px 16px rgba(0, 0, 0, .2);
      font-size: 14px;
      color: #303133;
      box-sizing: border-box;
    }
    .ht-settings-title {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 12px;
    }
    .ht-settings-close {
      position: absolute;
      top: -8px;
      right: -8px;
      width: 22px;
      height: 22px;
      line-height: 22px;
      border-radius: 50%;
      text-align: center;
      background: #909399;
      color: #fff;
      cursor: pointer;
      user-select: none;
    }
    .ht-settings-close:hover { opacity: .8; }
    .ht-settings-row {
      display: flex;
      gap: 8px;
      margin-bottom: 10px;
    }
    .ht-settings-row > * { min-width: 0; }
    .ht-settings-input {
      flex: 1;
      height: 36px;
      padding: 0 10px;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      color: #606266;
      background: #f5f7fa;
      box-sizing: border-box;
      outline: none;
    }
    .ht-settings-btn {
      height: 36px;
      padding: 0 16px;
      border: none;
      border-radius: 4px;
      background: #409eff;
      color: #fff;
      cursor: pointer;
    }
    .ht-settings-btn:hover { opacity: .85; }
    .ht-settings-label {
      flex: none;
      line-height: 36px;
    }
    .ht-settings-select {
      flex: 1;
      height: 36px;
      padding: 0 8px;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      color: #606266;
      background: #fff;
      box-sizing: border-box;
      outline: none;
    }
    .ht-settings-section {
      font-weight: bold;
      margin: 10px 0 6px;
    }
    /* 双列表拖拽语言清单 */
    .ht-lang-lists {
      display: flex;
      gap: 12px;
    }
    .ht-lang-col {
      flex: 1;
      min-width: 0;
    }
    .ht-lang-label {
      font-size: 12px;
      color: #909399;
      margin-bottom: 4px;
    }
    .ht-lang-list {
      height: 270px;
      overflow-y: auto;
      border: 1px solid #dcdfe6;
      padding: 4px;
    }
    .ht-lang-item {
      padding: 4px 8px;
      font-size: 13px;
      color: #606266;
      cursor: grab;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      user-select: none;
    }
    .ht-lang-item:hover { background: #f5f7fa; }
    .ht-lang-active { color: #409eff; font-weight: bold; }
    .ht-lang-selected { opacity: .45; }
    .ht-dragging { opacity: .35; }
    .ht-settings-footer {
      display: flex;
      justify-content: flex-end;
      margin-top: 10px;
    }
    .ht-settings-mini-btn {
      padding: 2px 12px;
      font-size: 12px;
      border: 1px solid #dcdfe6;
      background: #f5f7fa;
      color: #606266;
      cursor: pointer;
    }
    .ht-settings-mini-btn:hover {
      color: #409eff;
      border-color: #409eff;
      background: #fff;
    }
    .ht-settings-tip {
      color: #909399;
      font-size: 12px;
      line-height: 1.6;
      margin-top: 8px;
    }
  `)

  // 全局按键监听（window 捕获阶段，早于页面自身处理器，防止被 stopPropagation 拦截）：
  // 捕获模式下记录新快捷键，否则匹配快捷键触发翻译
  const modifierKeys = ['control', 'shift', 'alt', 'meta']
  window.addEventListener('keydown', e => {
    const key = (e.key || '').toLowerCase()
    if (e.isComposing || key === 'process') return // 输入法合成中的按键不参与
    if (modifierKeys.includes(key)) return
    if (key === 'escape' && capturing) {
      capturing = false
      if (htInput) htInput.value = getHotkey().split('+').join(' + ')
      GM_notification({ text: '已取消设置', title: '网页翻译', timeout: 1000 })
      return
    }
    if (capturing) {
      capturing = false
      const mods = []
      if (e.ctrlKey) mods.push('ctrl')
      if (e.shiftKey) mods.push('shift')
      if (e.altKey) mods.push('alt')
      // 纯字母数字无修饰键会干扰正常打字，强制要求修饰键
      if (!mods.length) {
        if (htInput) htInput.value = '至少需要一个修饰键（Ctrl/Shift/Alt）'
        GM_notification({ text: '至少需要一个修饰键（Ctrl/Shift/Alt），已取消', title: '网页翻译', timeout: 2000 })
        return
      }
      const hotkey = mods.concat([key]).join('+')
      GM_setValue('hotkey', hotkey)
      if (htInput) htInput.value = mods.concat([key]).join(' + ')
      registerHotkeyMenus()
      GM_notification({ text: '翻译快捷键已设置为：' + mods.concat([key]).join(' + '), title: '网页翻译', timeout: 2000 })
      return
    }
    const parts = []
    if (e.ctrlKey) parts.push('ctrl')
    if (e.shiftKey) parts.push('shift')
    if (e.altKey) parts.push('alt')
    parts.push(key)
    if (parts.join('+') === getHotkey()) triggerHotkeyTranslate()
  }, true)

  // 跨页接力检测: googtrans cookie 是谷歌控件的翻译状态记录(同站跳转/已翻译页刷新时存在)。
  // 注意: 页面自带控件或 cookie 自动续翻会把标题译成中文, 不能据此误判为中文站而拒绝注入,
  // 因此 cookie 指向清单内语言时绕过中文页检测
  const __googtransRaw = (document.cookie.match(/(?:^|;\s*)googtrans=([^;]+)/) || [])[1]
  const relayLang = __googtransRaw ? decodeURIComponent(__googtransRaw).split('/').pop() : null
  // 判断是不是中文，不是则执行(已翻译页面带 cookie 时照常注入)
  if (!isChinesePage() || (relayLang && getCustomLangs().includes(relayLang))) {
    // 创建网页元素方法
    function createElement(html, nodeText, attr, parent) {
      const element = document.createElement(nodeText)
      if (attr) {
        element[attr] = html
      } else {
        element.innerHTML = html
      }
      parent.appendChild(element)
      return element
    }

    // 初始化按钮位置
    setButtonPosition()
    // 初始化是否显示更好的翻译建议
    setShowTip()

    // 设置网页自动把 http 升级为 https
    // const e = document.createElement('meta')
    // e.setAttribute('http-equiv', 'Content-Security-Policy')
    // e.setAttribute('content', 'upgrade-insecure-requests')
    // head.appendChild(e)

    // 自定义样式，隐藏顶部栏
    GM_addStyle(`
      html,body{
        top: 0!important;
      }
      /* 页面自带的谷歌翻译控件容器与本脚本注入的隐藏容器一并隐藏 */
      #google_translate_element,
      #wt_google_translate_element {
        display: none !important;
      }
      /* 隐藏移动端顶部栏 */
      [id=":1.container"].skiptranslate {
        display: none;
      }
      /* 隐藏 PC 端顶部栏 */
      [id=":2.container"].skiptranslate {
        display: none;
      }
      /* 自研悬浮翻译控件 */
      #wt-fab {
        position: fixed;
        bottom: 30px;
        z-index: 10000000;
        opacity: .55;
        transition: all .3s;
        font-size: 14px;
      }
      #wt-fab:hover, #wt-fab.wt-open {
        opacity: 1;
        transform: translateX(0);
      }
      #wt-fab-bar {
        display: flex;
        flex-direction: column;
        gap: 6px;
        align-items: stretch;
      }
      #wt-fab-btn {
        background-color: #909399;
        color: rgba(255, 255, 255, .87);
        padding: 4px 14px;
        border-radius: 11px;
        box-shadow: 1px 1px 3px 0 #888;
        user-select: none;
        white-space: nowrap;
        cursor: pointer;
      }
      #wt-fab-btn.wt-ready {
        background-color: #646cff;
      }
      #wt-orig-btn {
        background-color: #909399;
        color: rgba(255, 255, 255, .87);
        padding: 4px 12px;
        border-radius: 11px;
        box-shadow: 1px 1px 3px 0 #888;
        user-select: none;
        white-space: nowrap;
        cursor: pointer;
      }
      #wt-fab-menu {
        display: none;
        margin-bottom: 6px;
        background-color: #fff;
        border: 1px solid #dcdfe6;
        box-shadow: 1px 1px 6px 0 #888;
        max-height: 60vh;
        overflow-y: auto;
      }
      #wt-fab.wt-open #wt-fab-menu {
        display: block;
      }
      .wt-fab-item {
        padding: 6px 14px;
        color: #303133;
        white-space: nowrap;
        cursor: pointer;
      }
      .wt-fab-item:hover {
        background-color: #f5f7fa;
      }
      .wt-fab-item.wt-fab-active {
        color: #409eff;
        font-weight: bold;
      }
      /* 页面自带控件不支持的语言项: 置灰不可点 */
      .wt-fab-item.wt-unavailable {
        opacity: .4;
      }
      .wt-fab-sep {
        height: 1px;
        background: #ebeef5;
        margin: 2px 0;
      }
    `)

    // 自研悬浮翻译控件
    const fab = document.createElement('div')
    fab.id = 'wt-fab'
    fab.className = 'notranslate'
    const fabMenu = document.createElement('div')
    fabMenu.id = 'wt-fab-menu'
    const fabBar = document.createElement('div')
    fabBar.id = 'wt-fab-bar'
    const fabBtn = document.createElement('div')
    fabBtn.id = 'wt-fab-btn'
    fabBtn.textContent = '翻译'
    const markActive = code => {
      hotkeyTranslated = !!code
      fabMenu.querySelectorAll('.wt-fab-item').forEach(it => {
        it.classList.toggle('wt-fab-active', it.dataset.code === code)
      })
      if (code) {
        const item = fabMenu.querySelector('.wt-fab-item[data-code="' + code + '"]')
        if (item) fabBtn.textContent = item.textContent
      } else {
        fabBtn.textContent = '翻译'
      }
    }
    // 恢复原文: 点击谷歌横幅 iframe 内的「显示原文」按钮(同时清除 googtrans cookie, 跳转不再续翻)
    const restoreOriginal = () => {
      const phone = document.getElementById(':1.container')
      const pc = document.getElementById(':2.container')
      const frame = phone || pc
      const doc = frame && (frame.contentWindow.document || frame.contentDocument)
      const restore = doc && doc.getElementById(phone ? ':1.restore' : ':2.restore')
      if (restore) restore.click()
      markActive('')
      fab.classList.remove('wt-open')
    }
    restoreOriginalFn = restoreOriginal
    // 语言项(按设置面板顺序)
    getCustomLangs().forEach(code => {
      const item = document.createElement('div')
      item.className = 'wt-fab-item'
      item.dataset.code = code
      item.textContent = langNames[code] || code
      if (code === getEffectiveTargetLang()) item.classList.add('wt-fab-active')
      item.onclick = () => {
        if (item.classList.contains('wt-unavailable')) {
          GM_notification({ text: '该页面自带的翻译控件不包含此语言', title: '网页翻译', timeout: 2000 })
          return
        }
        if (!engineResolved) {
          // 引擎未就绪: 暂存目标, 就绪后自动执行
          pendingTarget = code
          markActive(code)
          GM_notification({ text: '翻译组件加载中，就绪后自动执行', title: '网页翻译', timeout: 1500 })
        } else {
          driveEngine(code)
          markActive(code)
        }
        fab.classList.remove('wt-open')
      }
      fabMenu.appendChild(item)
    })
    // 「原文」独立按钮(常显, 与翻译按钮垂直排列于其上方)
    const origBtn = document.createElement('div')
    origBtn.id = 'wt-orig-btn'
    origBtn.textContent = '原文'
    origBtn.onclick = restoreOriginal
    fabBtn.onclick = e => {
      e.stopPropagation()
      fab.classList.toggle('wt-open')
    }
    document.addEventListener('click', e => {
      if (!fab.contains(e.target)) fab.classList.remove('wt-open')
    })
    fabBar.appendChild(origBtn)
    fabBar.appendChild(fabBtn)
    fab.appendChild(fabMenu)
    fab.appendChild(fabBar)
    body.appendChild(fab)

    // ===== 翻译引擎接入: 页面自带谷歌翻译控件优先复用, 无自带才注入本脚本的隐藏控件 =====
    // 同一页面 element.js 只会被真实加载一次, 二次加载的实例回调虽执行但 select 选项永不填充,
    // 因此页面已自带 element.js 脚本标签时绝不重复注入。
    const OUR_CB = 'wtGoogleTranslateElementInit'
    let engineOwn = false        // 当前引擎是否为页面自带控件
    let engineResolved = false   // 引擎 select 选项已填充, 可以驱动
    let engineInjected = false   // 已注入本脚本的隐藏控件
    let pendingTarget = ''       // 引擎未就绪时暂存的目标语言
    // 页面自带的谷歌 select(已填充选项, 且不属于本脚本容器)
    const findOwnCombo = () =>
      [...document.querySelectorAll('.goog-te-combo')]
        .find(c => !c.closest('#wt_google_translate_element') && c.options.length > 0)
    const findOurCombo = () => {
      const c = document.querySelector('#wt_google_translate_element .goog-te-combo')
      return c && c.options.length > 0 ? c : null
    }
    // 页面是否自带 element.js 脚本标签(排除本脚本注入的)
    const hasOwnScriptTag = () =>
      [...document.querySelectorAll('script[src]')]
        .some(s => /\/translate_a\/element\.js/.test(s.src) && s.src.indexOf(OUR_CB) === -1)
    // 驱动引擎翻译: 写入目标语言并触发 change(谷歌监听器响应, 与用户手选等效; 重复驱动无副作用)
    const driveEngine = code => {
      const combo = engineOwn ? findOwnCombo() : findOurCombo()
      if (!combo || !combo.querySelector('option[value="' + code + '"]')) return false
      combo.value = code
      combo.dispatchEvent(new Event('change', { bubbles: true }))
      return true
    }
    const flushPending = () => {
      if (!pendingTarget) return
      const code = pendingTarget
      pendingTarget = ''
      if (driveEngine(code)) markActive(code)
      else GM_notification({ text: '该页面自带的翻译控件不包含目标语言', title: '网页翻译', timeout: 2000 })
    }
    const engineReady = own => {
      if (engineResolved) return
      engineResolved = true
      engineOwn = own
      fabBtn.classList.add('wt-ready')
      // 自带控件语言受限时, 置灰清单里其不支持的项
      if (own) {
        const combo = findOwnCombo()
        if (combo) {
          fabMenu.querySelectorAll('.wt-fab-item').forEach(it => {
            if (!combo.querySelector('option[value="' + it.dataset.code + '"]')) it.classList.add('wt-unavailable')
          })
        }
      }
      flushPending()
    }
    // 注入本脚本的隐藏谷歌控件(独立命名空间容器 + 独立回调名, 与页面自带控件互不干扰)
    const injectOurs = () => {
      if (engineInjected) return
      engineInjected = true
      createElement('wt_google_translate_element', 'div', 'id', body)
      createElement(
        `
        let __wtElementInited = false
        function wtGoogleTranslateElementInit() {
          if (__wtElementInited) return
          __wtElementInited = true
          new google.translate.TranslateElement(
            {
              pageLanguage: 'auto',
              //包括的语言，跟随设置面板的自定义清单
              includedLanguages: '${getCustomLangs().join(',')}',
              /*
               * 0，原生select，并且谷歌logo显示在按钮下方。
               * 1，原生select，并且谷歌logo显示在右侧。
               * 2，完全展开语言列表，适合pc。
               */
              layout: 1
            },
            'wt_google_translate_element'
          )
        }
      `,
        'script',
        '',
        head
      )
      createElement(
        'https://translate.google.com/translate_a/element.js?cb=' + OUR_CB,
        'script',
        'src',
        head
      )
      // 谷歌会按自己的规则重排 includedLanguages, 选项填齐后按设置面板顺序重排覆盖
      let orderElapsed = 0
      const orderTimer = setInterval(() => {
        orderElapsed += 200
        const combo = document.querySelector('#wt_google_translate_element .goog-te-combo')
        if ((combo && combo.options.length >= getCustomLangs().length) || orderElapsed > 30000) {
          if (combo) {
            const empty = combo.querySelector('option[value=""]')
            getCustomLangs().forEach(code => {
              const opt = combo.querySelector('option[value="' + code + '"]')
              // 控件可能不认识某些代码(被过滤), 跳过
              if (opt) combo.appendChild(opt)
            })
            // 空选项(原始语言)保持在最前
            if (empty) combo.insertBefore(empty, combo.firstChild)
          }
          clearInterval(orderTimer)
        }
      }, 200)
    }
    // 引擎决策循环: 自带控件就绪即复用; 有自带脚本则等它(疑似失败 20s 后兜底注入);
    // 两者皆无立即注入。就绪后停止。
    let engineElapsed = 0
    const engineTimer = setInterval(() => {
      engineElapsed += 300
      if (findOwnCombo()) { engineReady(true); clearInterval(engineTimer); return }
      if (findOurCombo()) { engineReady(false); clearInterval(engineTimer); return }
      if (engineInjected) return
      if (hasOwnScriptTag()) {
        // 自带脚本迟迟未产出选项, 视为其加载失败, 兜底注入
        // (此时本脚本的加载将成为首个真实执行的 element.js, 依旧可用)
        if (engineElapsed > 20000) injectOurs()
        return
      }
      injectOurs()
    }, 300)
    // 跨页接力: 谷歌经 googtrans cookie 记录目标语言, 带 cookie 加载页面时控件自动续翻(实测);
    // 这里同步按钮状态并补一次驱动(重复驱动无副作用)
    if (relayLang && getCustomLangs().includes(relayLang)) {
      markActive(relayLang)
      pendingTarget = relayLang
    }

    // 排除一些代码的翻译
    const noTranslateArray = [
      '.bbCodeCode',
      'tt',
      'pre[translate="no"]',
      'pre',
      '.post_spoiler_show',
      '.c-article-section__content sub',
      '.c-article-section__content sup',
      '.c-article-equation',
      '.mathjax-tex'
    ]
    noTranslateArray.forEach(selectorName => {
      ;[...document.querySelectorAll(selectorName)].forEach(node => {
        if (node.className.indexOf('notranslate') === -1) {
          node.classList.add('notranslate')
        }
      })
    })

    // 针对一些网站排除一些无需翻译的文字
    const noTranslateList = [
      {
        site: 'cratchapixel.com',
        selector: ['span.MathJax']
      }
    ]
    noTranslateList.forEach(item => {
      if (~document.domain.indexOf(item.site)) {
        item.selector.forEach(selectorName => {
          let timer = null
          let classList = document.querySelectorAll(selectorName)
          if (!classList[0]) {
            timer = setInterval(() => {
              classList = document.querySelectorAll(selectorName)
              if (classList[0]) {
                clearInterval(timer)
                ;[...classList].forEach(node => {
                  if (!~node.className.indexOf('notranslate')) {
                    node.classList.add('notranslate')
                  }
                })
              }
            })
          }
        })
      }
    })

    // 解决一些网站开启脚本之后不能滚动
    function CanIScroll() {
      // 其它网站
      const noScrollSite = ['curseforge.com']
      noScrollSite.forEach(site => {
        if (~document.domain.indexOf(site)) {
          GM_addStyle(`
            html {
              height: auto!important;
            }
          `)
        }
      })

      // 解决 gatesnotes.com 开启脚本之后不能滚动的问题,原理 z-index 太低导致
      if (~document.domain.indexOf('gatesnotes.com')) {
        GM_addStyle(`
          .TGN_site {
            z-index: 0!important;
          }
        `)
      }
    }
    CanIScroll()
  }
  } // end __wtMain

  let __wtStarted = false
  const __wtStartMain = () => {
    if (__wtStarted) return
    __wtStarted = true
    __wtMain()
  }
  if (document.readyState === 'complete') __wtStartMain()
  else {
    window.addEventListener('load', __wtStartMain, { once: true })
    // 兜底: 个别页面 load 永不触发(有悬挂资源), 30 秒后也启动, 保证功能可用
    setTimeout(__wtStartMain, 30000)
  }
})()
