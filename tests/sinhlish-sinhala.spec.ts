import { test, expect } from '@playwright/test';

/**
 * Test data extracted from 'Assignment 1 - Test cases.It23219120.xlsx'.
 * Total scenarios: 35 (24 Positive Functional, 10 Negative Functional, 1 Positive UI, 0 Negative UI).
 */
const testData = [
  { id: 'Pos_Fun_0001', name: 'Compound with contrast', input: 'mama enne hadhanne, namuth mage hitha wenas vuna.', expected: 'මම එන්න හදන්නේ, නමුත් මගේ හිත වෙනස් වුණා.' },
  { id: 'Pos_Fun_0002', name: 'Interrogative phrasing', input: 'oyata hariyata therenne naddha?', expected: 'ඔයාට හරියට තේරෙන්නේ නැද්ද?' },
  { id: 'Pos_Fun_0003', name: 'Polite phrasing', input: 'oyaata apahasuwak naththan, mata kiyanna puluvandha?', expected: 'ඔබට අපහසුවක් නැත්නම්, මට කියන්න පුළුවන්ද?' },
  { id: 'Pos_Fun_0004', name: 'Repetition emphasis', input: 'loku loku deval thiyenavaa.', expected: 'ලොකු ලොකු දේවල් තියෙනවා.' },
  { id: 'Pos_Fun_0005', name: 'Past tense', input: 'mama eka hondatama mathaka thiyagaththa.', expected: 'මම ඒක හොඳටම මතක තියාගත්තා.' },
  { id: 'Pos_Fun_0006', name: 'Present continuous', input: 'api mehema hithagena inne.', expected: 'අපි මෙහෙම හිතගෙන ඉන්නේ.' },
  { id: 'Pos_Fun_0007', name: 'Future', input: 'mama passe eka gana balannam.', expected: 'මම පස්සේ ඒක ගැන බලන්නම්.' },
  { id: 'Pos_Fun_0008', name: 'Mixed language', input: 'mage meeting eka Zoom walin thiyenavaa..', expected: 'මගේ meeting එක Zoom වලින් තියෙනවා.' },
  { id: 'Pos_Fun_0009', name: 'Place name', input: 'api passe Negombo patta balamu.', expected: 'අපි පස්සේ Negombo පැත්ත බලමු.' },
  { id: 'Pos_Fun_0010', name: 'Abbreviation', input: 'mage NIC eka hoyaagnna behe.', expected: 'මගේ NIC එක හොයාගන්න බැහැ.' },
  { id: 'Pos_Fun_0011', name: 'Punctuation', input: 'ehema naththang, mokakda karanne?', expected: 'එහෙම නැත්නං, මොකක්ද කරන්නේ?' },
  { id: 'Pos_Fun_0012', name: 'Currency + verb', input: 'eeka Rs. 2750 witharai.', expected: 'ඒක Rs. 2750 විතරයි.' },
  { id: 'Pos_Fun_0013', name: 'Multi‑line', input: 'mama inne loku pressure ekaka.\\noyaata therenne naddha?', expected: 'මම ඉන්නේ ලොකු පීඩනයක.\\nඔයාට තේරෙන්නේ නැද්ද?' },
  { id: 'Pos_Fun_0014', name: 'Simple request', input: 'mata bath oonee', expected: 'මට බත් ඕනේ.' },
  { id: 'Pos_Fun_0015', name: 'Politeness variation', input: 'Poddak balanna puluwanda?', expected: 'පොඩ්ඩක් බලන්න පුළුවන්ද?' },
  { id: 'Pos_Fun_0016', name: 'Imperative', input: 'vahaama enna', expected: 'වහාම එන්න.' },
  { id: 'Pos_Fun_0017', name: 'Negative form', input: 'mama ehema karanne naehae.', expected: 'මම එහෙම කරන්නේ නැහැ.' },
  { id: 'Pos_Fun_0018', name: 'Greeting', input: 'aayuboovan!', expected: 'ආයුබෝවන්!' },
  { id: 'Pos_Fun_0019', name: 'Informal phrase', input: 'ela machan!', expected: 'එල මචං!' },
  { id: 'Pos_Fun_0020', name: 'Joined words', input: 'mamagedharayanavaa', expected: 'මම ගෙදර යනවා.' },
  { id: 'Pos_Fun_0021', name: 'Pronoun plural', input: 'api yamu', expected: 'අපි යමු.' },
  { id: 'Pos_Fun_0022', name: 'Currency & time', input: 'Rs. 5343 gewanna thiyenavaa 7.30 AM', expected: 'රු. 5343 ගෙවන්න තියෙනවා 7.30 AM.' },
  { id: 'Pos_Fun_0023', name: 'Abbreviation', input: 'OTP eka dhenna', expected: 'OTP එක දෙන්න.' },
  { id: 'Pos_Fun_0024', name: 'Day-to-day expression', input: 'mata nidhimathayi', expected: 'මට නිදිමතයි.' },

  { id: 'Neg_Fun_0001', name: 'Incorrect spacing', input: 'mamahithuwothennava', expected: 'මම හිතුවොත් එන්නවා' },
  { id: 'Neg_Fun_0002', name: 'Excessive punctuation', input: 'mama yanavaa!!!???', expected: 'මම යනවා!!!???' },
  { id: 'Neg_Fun_0003', name: 'Numeric confusion', input: 'mata 2k witharai oone', expected: 'මට 2000 විතරයි ඕනේ' },
  { id: 'Neg_Fun_0004', name: 'Slang handling', input: 'Thanks machan', expected: 'තැන්ක්ස් machan' },
  { id: 'Neg_Fun_0005', name: 'Wrong tense detection', input: 'mama heta giyaa', expected: 'මම හෙට ගියා' },
  { id: 'Neg_Fun_0006', name: 'Long repetition overflow', input: 'awul awul awul awul awul awul awul awul', expected: 'අවුල් අවුල් අවුල් අවුල්' },
  { id: 'Neg_Fun_0007', name: 'Invalid punctuation sequence', input: 'mama!!! karanavaa??', expected: 'මම කරනවා!!!' },
  { id: 'Neg_Fun_0008', name: 'Emoji handling', input: 'mata hari awul 😵‍💫', expected: 'මට හරි අවුල් 😵‍💫' },
  { id: 'Neg_Fun_0009', name: 'Informal insult tone', input: 'oya nam loku awul', expected: 'ඔයා නම් ලොකු අවුල්' },
  { id: 'Neg_Fun_0010', name: 'Line break loss', input: 'mama inne awulak\\noya danne nadda', expected: 'මම ඉන්නේ අවුලක්\\nඔයා දන්නේ නැද්ද' },

  { id: 'Pos_UI_0001', name: 'Tooltip shows full text', input: 'mama gedhara yanavaa, oba dhakinna puluvandha?', expected: 'මම ගෙදර යනවා, ඔබ දකින්න පුලුවන්ද?' },
];

test.describe('IT3040 Assignment: Swift Translator Automation', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/', { waitUntil: 'networkidle' });
  });

  for (const scenario of testData) {
    test(`${scenario.id}: ${scenario.name} | RAJAPAKSHA R.M.C.D (it23219120)`, async ({ page }, testInfo) => {
      const inputArea = page.getByPlaceholder('Input Your Singlish Text Here.');
      const outputPanel = page.locator('div.bg-slate-50');

      await inputArea.fill(scenario.input);
      await page.waitForTimeout(800);

      const actualOutput = (await outputPanel.innerText()).trim();

      console.log(`TC ID: ${scenario.id}`);
      console.log(`Actual Output: ${actualOutput}`);

      testInfo.annotations.push({
        type: 'Actual Output (Sinhala)',
        description: actualOutput
      });

      if (scenario.id.startsWith('Pos_UI')) {
        // UI scenario: verify tooltip/title contains full converted text (best-effort)
        await outputPanel.hover();
        const titleAttr = await outputPanel.getAttribute('title');

        if (titleAttr) {
          expect(titleAttr.trim()).toBe(scenario.expected);
        } else {
          await expect(outputPanel).toHaveText(scenario.expected);
        }
      } else {
        await expect(outputPanel).toHaveText(scenario.expected);
      }
    });
  }

});