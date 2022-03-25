/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  assertHTML,
  click,
  clickSelectors,
  copyToClipboard,
  dragMouse,
  focusEditor,
  html,
  initialize,
  IS_COLLAB,
  pasteFromClipboard,
  test,
  waitForSelector,
} from '../utils/index.mjs';

async function insertTable(page) {
  // Open modal
  await waitForSelector(page, 'button .table');
  await click(page, 'button .table');

  // Confirm default 3x3 dimensions
  await waitForSelector(
    page,
    'div[data-test-id="table-model-confirm-insert"] > .Button__root',
  );
  await click(
    page,
    'div[data-test-id="table-model-confirm-insert"] > .Button__root',
  );
}

async function fillTablePartiallyWithText(page) {
  await page.keyboard.type('a');
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('b');
  await page.keyboard.press('Tab');
  await page.keyboard.press('c');
  await page.keyboard.down('Shift');
  await page.keyboard.press('Tab');
  await page.keyboard.up('Shift');
  await page.keyboard.press('b');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('ArrowLeft');
  await page.keyboard.press('d');
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('e');
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('f');
  await page.keyboard.press('ArrowUp');
  await page.keyboard.press('c');
}

async function selectCellsFromTableCords(page, firstCords, secondCords) {
  let p = page;

  if (IS_COLLAB) {
    await focusEditor(page);
    p = await page.frame('left');
  }

  const firstRowFirstColumnCellBoundingBox = await p.locator(
    `table:first-of-type > tr:nth-child(${firstCords.y + 1}) > th:nth-child(${
      firstCords.x + 1
    })`,
  );

  const secondRowSecondCellBoundingBox = await p.locator(
    `table:first-of-type > tr:nth-child(${secondCords.y + 1}) > td:nth-child(${
      secondCords.x + 1
    })`,
  );

  // Focus on inside the iFrame or the boundingBox() below returns null.
  await firstRowFirstColumnCellBoundingBox.click();

  await dragMouse(
    page,
    await firstRowFirstColumnCellBoundingBox.boundingBox(),
    await secondRowSecondCellBoundingBox.boundingBox(),
  );
}

test.describe('Tables', () => {
  test.beforeEach(({isCollab, page}) => initialize({isCollab, page}));
  test(`Can a table be inserted from the toolbar`, async ({
    page,
    isPlainText,
  }) => {
    test.skip(isPlainText);
    await focusEditor(page);

    await insertTable(page);

    await assertHTML(
      page,
      html`
        <p><br /></p>
        <table>
          <tr>
            <th>
              <p><br /></p>
            </th>
            <th>
              <p><br /></p>
            </th>
            <th>
              <p><br /></p>
            </th>
            <th>
              <p><br /></p>
            </th>
            <th>
              <p><br /></p>
            </th>
          </tr>
          <tr>
            <th>
              <p><br /></p>
            </th>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
          </tr>
          <tr>
            <th>
              <p><br /></p>
            </th>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
          </tr>
          <tr>
            <th>
              <p><br /></p>
            </th>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
          </tr>
          <tr>
            <th>
              <p><br /></p>
            </th>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
          </tr>
        </table>
        <p><br /></p>
      `,
      {ignoreClasses: true},
    );
  });

  test(`Can type inside of table cell`, async ({page, isPlainText}) => {
    test.skip(isPlainText);

    await focusEditor(page);
    await insertTable(page);

    await page.keyboard.type('abc');

    await assertHTML(
      page,
      html`
        <p><br /></p>
        <table>
          <tr>
            <th>
              <p dir="ltr">
                <span data-lexical-text="true">abc</span>
              </p>
            </th>
            <th>
              <p><br /></p>
            </th>
            <th>
              <p><br /></p>
            </th>
            <th>
              <p><br /></p>
            </th>
            <th>
              <p><br /></p>
            </th>
          </tr>
          <tr>
            <th>
              <p><br /></p>
            </th>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
          </tr>
          <tr>
            <th>
              <p><br /></p>
            </th>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
          </tr>
          <tr>
            <th>
              <p><br /></p>
            </th>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
          </tr>
          <tr>
            <th>
              <p><br /></p>
            </th>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
          </tr>
        </table>
        <p><br /></p>
      `,
      {ignoreClasses: true},
    );
  });

  test(`Can navigate table with keyboard`, async ({page, isPlainText}) => {
    test.skip(isPlainText);

    await focusEditor(page);
    await insertTable(page);

    await fillTablePartiallyWithText(page);

    await assertHTML(
      page,
      html`
        <p><br /></p>
        <table>
          <tr>
            <th>
              <p dir="ltr">
                <span data-lexical-text="true">a</span>
              </p>
            </th>
            <th>
              <p dir="ltr">
                <span data-lexical-text="true">bb</span>
              </p>
            </th>
            <th>
              <p dir="ltr">
                <span data-lexical-text="true">cc</span>
              </p>
            </th>
            <th>
              <p><br /></p>
            </th>
            <th>
              <p><br /></p>
            </th>
          </tr>
          <tr>
            <th>
              <p dir="ltr">
                <span data-lexical-text="true">d</span>
              </p>
            </th>
            <td>
              <p dir="ltr">
                <span data-lexical-text="true">e</span>
              </p>
            </td>
            <td>
              <p dir="ltr">
                <span data-lexical-text="true">f</span>
              </p>
            </td>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
          </tr>
          <tr>
            <th>
              <p><br /></p>
            </th>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
          </tr>
          <tr>
            <th>
              <p><br /></p>
            </th>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
          </tr>
          <tr>
            <th>
              <p><br /></p>
            </th>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
          </tr>
        </table>
        <p><br /></p>
      `,
      {ignoreClasses: true},
    );
  });

  test(`Can select cells using Table selection`, async ({
    page,
    isPlainText,
  }) => {
    test.skip(isPlainText);

    await focusEditor(page);
    await insertTable(page);

    await fillTablePartiallyWithText(page);
    await selectCellsFromTableCords(page, {x: 0, y: 0}, {x: 1, y: 1});

    await assertHTML(
      page,
      html`
        <p><br /></p>
        <table>
          <tr>
            <th
              style="background-color: rgb(163, 187, 255); caret-color: transparent;"
            >
              <p dir="ltr">
                <span data-lexical-text="true">a</span>
              </p>
            </th>
            <th
              style="background-color: rgb(163, 187, 255); caret-color: transparent;"
            >
              <p dir="ltr">
                <span data-lexical-text="true">bb</span>
              </p>
            </th>
            <th>
              <p dir="ltr">
                <span data-lexical-text="true">cc</span>
              </p>
            </th>
            <th>
              <p><br /></p>
            </th>
            <th>
              <p><br /></p>
            </th>
          </tr>
          <tr>
            <th
              style="background-color: rgb(163, 187, 255); caret-color: transparent;"
            >
              <p dir="ltr">
                <span data-lexical-text="true">d</span>
              </p>
            </th>
            <td
              style="background-color: rgb(163, 187, 255); caret-color: transparent;"
            >
              <p dir="ltr">
                <span data-lexical-text="true">e</span>
              </p>
            </td>
            <td>
              <p dir="ltr">
                <span data-lexical-text="true">f</span>
              </p>
            </td>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
          </tr>
          <tr>
            <th>
              <p><br /></p>
            </th>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
          </tr>
          <tr>
            <th>
              <p><br /></p>
            </th>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
          </tr>
          <tr>
            <th>
              <p><br /></p>
            </th>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
          </tr>
        </table>
        <p><br /></p>
      `,
      {ignoreClasses: true, ignoreSecondFrame: true},
    );

    // Check that the highlight styles are applied.
    await assertHTML(
      page,
      html`
        <p><br /></p>
        <table>
          <tr>
            <th
              style="background-color: rgb(163, 187, 255); caret-color: transparent;"
            >
              <p dir="ltr">
                <span data-lexical-text="true">a</span>
              </p>
            </th>
            <th
              style="background-color: rgb(163, 187, 255); caret-color: transparent;"
            >
              <p dir="ltr">
                <span data-lexical-text="true">bb</span>
              </p>
            </th>
            <th>
              <p dir="ltr">
                <span data-lexical-text="true">cc</span>
              </p>
            </th>
            <th>
              <p><br /></p>
            </th>
            <th>
              <p><br /></p>
            </th>
          </tr>
          <tr>
            <th
              style="background-color: rgb(163, 187, 255); caret-color: transparent;"
            >
              <p dir="ltr">
                <span data-lexical-text="true">d</span>
              </p>
            </th>
            <td
              style="background-color: rgb(163, 187, 255); caret-color: transparent;"
            >
              <p dir="ltr">
                <span data-lexical-text="true">e</span>
              </p>
            </td>
            <td>
              <p dir="ltr">
                <span data-lexical-text="true">f</span>
              </p>
            </td>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
          </tr>
          <tr>
            <th>
              <p><br /></p>
            </th>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
          </tr>
          <tr>
            <th>
              <p><br /></p>
            </th>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
          </tr>
          <tr>
            <th>
              <p><br /></p>
            </th>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
          </tr>
        </table>
        <p><br /></p>
      `,
      {ignoreClasses: true, ignoreSecondFrame: true},
    );
  });

  test(`Can select cells using Table selection via keyboard`, async ({
    page,
    isPlainText,
  }) => {
    test.skip(isPlainText);

    await focusEditor(page);
    await insertTable(page);

    await fillTablePartiallyWithText(page);

    let p = page;

    if (IS_COLLAB) {
      await focusEditor(page);
      p = await page.frame('left');
    }

    const firstRowFirstColumnCellBoundingBox = await p.locator(
      'table:first-of-type > tr:nth-child(1) > th:nth-child(1)',
    );

    // Focus on inside the iFrame or the boundingBox() below returns null.
    await firstRowFirstColumnCellBoundingBox.click();

    await page.keyboard.down('Shift');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.up('Shift');

    await assertHTML(
      page,
      html`
        <p><br /></p>
        <table>
          <tr>
            <th
              style="background-color: rgb(163, 187, 255); caret-color: transparent;"
            >
              <p dir="ltr">
                <span data-lexical-text="true">a</span>
              </p>
            </th>
            <th
              style="background-color: rgb(163, 187, 255); caret-color: transparent;"
            >
              <p dir="ltr">
                <span data-lexical-text="true">bb</span>
              </p>
            </th>
            <th>
              <p dir="ltr">
                <span data-lexical-text="true">cc</span>
              </p>
            </th>
            <th>
              <p><br /></p>
            </th>
            <th>
              <p><br /></p>
            </th>
          </tr>
          <tr>
            <th
              style="background-color: rgb(163, 187, 255); caret-color: transparent;"
            >
              <p dir="ltr">
                <span data-lexical-text="true">d</span>
              </p>
            </th>
            <td
              style="background-color: rgb(163, 187, 255); caret-color: transparent;"
            >
              <p dir="ltr">
                <span data-lexical-text="true">e</span>
              </p>
            </td>
            <td>
              <p dir="ltr">
                <span data-lexical-text="true">f</span>
              </p>
            </td>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
          </tr>
          <tr>
            <th>
              <p><br /></p>
            </th>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
          </tr>
          <tr>
            <th>
              <p><br /></p>
            </th>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
          </tr>
          <tr>
            <th>
              <p><br /></p>
            </th>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
          </tr>
        </table>
        <p><br /></p>
      `,
      {ignoreClasses: true, ignoreSecondFrame: true},
    );
  });

  test(`Can style text using Table selection`, async ({page, isPlainText}) => {
    test.skip(isPlainText);

    await focusEditor(page);
    await insertTable(page);

    await fillTablePartiallyWithText(page);
    await selectCellsFromTableCords(page, {x: 0, y: 0}, {x: 1, y: 1});

    await clickSelectors(page, [
      '.bold',
      '.italic',
      '.underline',
      '.strikethrough',
    ]);

    // Check that the character styles are applied.
    await assertHTML(
      page,
      html`
        <p><br /></p>
        <table>
          <tr>
            <th
              style="background-color: rgb(163, 187, 255); caret-color: transparent;"
            >
              <p dir="ltr">
                <strong data-lexical-text="true">a</strong>
              </p>
            </th>
            <th
              style="background-color: rgb(163, 187, 255); caret-color: transparent;"
            >
              <p dir="ltr">
                <strong data-lexical-text="true">bb</strong>
              </p>
            </th>
            <th>
              <p dir="ltr">
                <span data-lexical-text="true">cc</span>
              </p>
            </th>
            <th>
              <p><br /></p>
            </th>
            <th>
              <p><br /></p>
            </th>
          </tr>
          <tr>
            <th
              style="background-color: rgb(163, 187, 255); caret-color: transparent;"
            >
              <p dir="ltr">
                <strong data-lexical-text="true">d</strong>
              </p>
            </th>
            <td
              style="background-color: rgb(163, 187, 255); caret-color: transparent;"
            >
              <p dir="ltr">
                <strong data-lexical-text="true">e</strong>
              </p>
            </td>
            <td>
              <p dir="ltr">
                <span data-lexical-text="true">f</span>
              </p>
            </td>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
          </tr>
          <tr>
            <th>
              <p><br /></p>
            </th>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
          </tr>
          <tr>
            <th>
              <p><br /></p>
            </th>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
          </tr>
          <tr>
            <th>
              <p><br /></p>
            </th>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
          </tr>
        </table>
        <p><br /></p>
      `,
      {ignoreClasses: true, ignoreSecondFrame: true},
    );
  });

  test(`Can copy + paste (internal) using Table selection`, async ({
    page,
    isPlainText,
  }) => {
    test.skip(isPlainText);

    await focusEditor(page);
    await insertTable(page);

    await fillTablePartiallyWithText(page);
    await selectCellsFromTableCords(page, {x: 0, y: 0}, {x: 1, y: 1});

    const clipboard = await copyToClipboard(page);

    // For some reason you need to click the paragraph twice for this to pass
    // on Collab Firefox.
    await click(page, 'div.ContentEditable__root > p:first-of-type');
    await click(page, 'div.ContentEditable__root > p:first-of-type');

    await pasteFromClipboard(page, clipboard);

    // Check that the character styles are applied.
    await assertHTML(
      page,
      html`
        <table class="PlaygroundEditorTheme__table">
          <tr>
            <th
              class="PlaygroundEditorTheme__tableCell PlaygroundEditorTheme__tableCellHeader"
            >
              <p
                class="PlaygroundEditorTheme__paragraph PlaygroundEditorTheme__ltr"
                dir="ltr"
              >
                <span data-lexical-text="true">a</span>
              </p>
            </th>
            <th
              class="PlaygroundEditorTheme__tableCell PlaygroundEditorTheme__tableCellHeader"
            >
              <p
                class="PlaygroundEditorTheme__paragraph PlaygroundEditorTheme__ltr"
                dir="ltr"
              >
                <span data-lexical-text="true">bb</span>
              </p>
            </th>
          </tr>
          <tr>
            <th
              class="PlaygroundEditorTheme__tableCell PlaygroundEditorTheme__tableCellHeader"
            >
              <p
                class="PlaygroundEditorTheme__paragraph PlaygroundEditorTheme__ltr"
                dir="ltr"
              >
                <span data-lexical-text="true">d</span>
              </p>
            </th>
            <td class="PlaygroundEditorTheme__tableCell">
              <p
                class="PlaygroundEditorTheme__paragraph PlaygroundEditorTheme__ltr"
                dir="ltr"
              >
                <span data-lexical-text="true">e</span>
              </p>
            </td>
          </tr>
        </table>
        <table class="PlaygroundEditorTheme__table">
          <tr>
            <th
              class="PlaygroundEditorTheme__tableCell PlaygroundEditorTheme__tableCellHeader"
            >
              <p
                class="PlaygroundEditorTheme__paragraph PlaygroundEditorTheme__ltr"
                dir="ltr"
              >
                <span data-lexical-text="true">a</span>
              </p>
            </th>
            <th
              class="PlaygroundEditorTheme__tableCell PlaygroundEditorTheme__tableCellHeader"
            >
              <p
                class="PlaygroundEditorTheme__paragraph PlaygroundEditorTheme__ltr"
                dir="ltr"
              >
                <span data-lexical-text="true">bb</span>
              </p>
            </th>
            <th
              class="PlaygroundEditorTheme__tableCell PlaygroundEditorTheme__tableCellHeader"
            >
              <p
                class="PlaygroundEditorTheme__paragraph PlaygroundEditorTheme__ltr"
                dir="ltr"
              >
                <span data-lexical-text="true">cc</span>
              </p>
            </th>
            <th
              class="PlaygroundEditorTheme__tableCell PlaygroundEditorTheme__tableCellHeader"
            >
              <p class="PlaygroundEditorTheme__paragraph"><br /></p>
            </th>
            <th
              class="PlaygroundEditorTheme__tableCell PlaygroundEditorTheme__tableCellHeader"
            >
              <p class="PlaygroundEditorTheme__paragraph"><br /></p>
            </th>
          </tr>
          <tr>
            <th
              class="PlaygroundEditorTheme__tableCell PlaygroundEditorTheme__tableCellHeader"
            >
              <p
                class="PlaygroundEditorTheme__paragraph PlaygroundEditorTheme__ltr"
                dir="ltr"
              >
                <span data-lexical-text="true">d</span>
              </p>
            </th>
            <td class="PlaygroundEditorTheme__tableCell">
              <p
                class="PlaygroundEditorTheme__paragraph PlaygroundEditorTheme__ltr"
                dir="ltr"
              >
                <span data-lexical-text="true">e</span>
              </p>
            </td>
            <td class="PlaygroundEditorTheme__tableCell">
              <p
                class="PlaygroundEditorTheme__paragraph PlaygroundEditorTheme__ltr"
                dir="ltr"
              >
                <span data-lexical-text="true">f</span>
              </p>
            </td>
            <td class="PlaygroundEditorTheme__tableCell">
              <p class="PlaygroundEditorTheme__paragraph"><br /></p>
            </td>
            <td class="PlaygroundEditorTheme__tableCell">
              <p class="PlaygroundEditorTheme__paragraph"><br /></p>
            </td>
          </tr>
          <tr>
            <th
              class="PlaygroundEditorTheme__tableCell PlaygroundEditorTheme__tableCellHeader"
            >
              <p class="PlaygroundEditorTheme__paragraph"><br /></p>
            </th>
            <td class="PlaygroundEditorTheme__tableCell">
              <p class="PlaygroundEditorTheme__paragraph"><br /></p>
            </td>
            <td class="PlaygroundEditorTheme__tableCell">
              <p class="PlaygroundEditorTheme__paragraph"><br /></p>
            </td>
            <td class="PlaygroundEditorTheme__tableCell">
              <p class="PlaygroundEditorTheme__paragraph"><br /></p>
            </td>
            <td class="PlaygroundEditorTheme__tableCell">
              <p class="PlaygroundEditorTheme__paragraph"><br /></p>
            </td>
          </tr>
          <tr>
            <th
              class="PlaygroundEditorTheme__tableCell PlaygroundEditorTheme__tableCellHeader"
            >
              <p class="PlaygroundEditorTheme__paragraph"><br /></p>
            </th>
            <td class="PlaygroundEditorTheme__tableCell">
              <p class="PlaygroundEditorTheme__paragraph"><br /></p>
            </td>
            <td class="PlaygroundEditorTheme__tableCell">
              <p class="PlaygroundEditorTheme__paragraph"><br /></p>
            </td>
            <td class="PlaygroundEditorTheme__tableCell">
              <p class="PlaygroundEditorTheme__paragraph"><br /></p>
            </td>
            <td class="PlaygroundEditorTheme__tableCell">
              <p class="PlaygroundEditorTheme__paragraph"><br /></p>
            </td>
          </tr>
          <tr>
            <th
              class="PlaygroundEditorTheme__tableCell PlaygroundEditorTheme__tableCellHeader"
            >
              <p class="PlaygroundEditorTheme__paragraph"><br /></p>
            </th>
            <td class="PlaygroundEditorTheme__tableCell">
              <p class="PlaygroundEditorTheme__paragraph"><br /></p>
            </td>
            <td class="PlaygroundEditorTheme__tableCell">
              <p class="PlaygroundEditorTheme__paragraph"><br /></p>
            </td>
            <td class="PlaygroundEditorTheme__tableCell">
              <p class="PlaygroundEditorTheme__paragraph"><br /></p>
            </td>
            <td class="PlaygroundEditorTheme__tableCell">
              <p class="PlaygroundEditorTheme__paragraph"><br /></p>
            </td>
          </tr>
        </table>
        <p class="PlaygroundEditorTheme__paragraph"><br /></p>
      `,
      {ignoreClasses: true, ignoreSecondFrame: true},
    );
  });

  test(`Can clear text using Table selection`, async ({page, isPlainText}) => {
    test.skip(isPlainText);

    await focusEditor(page);
    await insertTable(page);

    await fillTablePartiallyWithText(page);
    await selectCellsFromTableCords(page, {x: 0, y: 0}, {x: 1, y: 1});

    await page.keyboard.press('Backspace');

    // Check that the text was cleared.
    await assertHTML(
      page,
      html`
        <p><br /></p>
        <table>
          <tr>
            <th>
              <p><br /></p>
            </th>
            <th>
              <p><br /></p>
            </th>
            <th>
              <p dir="ltr">
                <span data-lexical-text="true">cc</span>
              </p>
            </th>
            <th>
              <p><br /></p>
            </th>
            <th>
              <p><br /></p>
            </th>
          </tr>
          <tr>
            <th>
              <p><br /></p>
            </th>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p dir="ltr">
                <span data-lexical-text="true">f</span>
              </p>
            </td>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
          </tr>
          <tr>
            <th>
              <p><br /></p>
            </th>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
          </tr>
          <tr>
            <th>
              <p><br /></p>
            </th>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
          </tr>
          <tr>
            <th>
              <p><br /></p>
            </th>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
            <td>
              <p><br /></p>
            </td>
          </tr>
        </table>
        <p><br /></p>
      `,
      {ignoreClasses: true},
    );
  });
});
