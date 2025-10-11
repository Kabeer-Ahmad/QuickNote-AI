/**
 * Test script for Gemini 2.0 Flash-Lite integration
 * Run with: node test-gemini.js
 */

const { GoogleGenAI } = require('@google/genai');
require('dotenv').config({ path: '.env.local' });

async function testGemini2FlashLite() {
  const apiKey = process.env.GOOGLE_API_KEY;
  
  if (!apiKey) {
    console.error('❌ GOOGLE_API_KEY not found in .env.local');
    return;
  }

  console.log('🚀 Testing Gemini 2.0 Flash-Lite...');
  
  try {
    const ai = new GoogleGenAI({ apiKey });

    const testContent = `
    Meeting Notes - Q1 Planning Session
    
    We discussed the new product roadmap for 2025, focusing on budget allocation for AI features and comprehensive team expansion plans. The team agreed on prioritizing machine learning capabilities and improving user experience. We also reviewed the current market trends and competitive analysis. The next steps include finalizing the budget proposal and hiring two additional developers by March.
    `;

    const prompt = `You are a concise assistant. Summarize the input in 3–5 bullet points and one 1‑sentence "In Short:" summary. Keep factual, avoid new claims.

Content to summarize:
${testContent}`;

    console.log('📝 Sending request to Gemini 2.0 Flash-Lite...');
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-lite',
      contents: prompt,
      config: {
        temperature: 0.3,
        maxOutputTokens: 200,
        topP: 0.8,
        topK: 40,
        thinkingConfig: {
          thinkingBudget: 0, // Disables thinking for faster responses
        },
      }
    });
    
    const summary = response.text;

    console.log('✅ Success! Summary generated:');
    console.log('─'.repeat(50));
    console.log(summary);
    console.log('─'.repeat(50));
    
    // Test model info
    console.log('\n📊 Model Information:');
    console.log(`Model: gemini-2.0-flash-lite`);
    console.log(`Input tokens: ~${Math.ceil(testContent.length / 4)}`);
    console.log(`Output tokens: ~${Math.ceil(summary.length / 4)}`);
    console.log(`Thinking disabled: true (thinkingBudget: 0)`);
    
  } catch (error) {
    console.error('❌ Error testing Gemini 2.0 Flash-Lite:', error.message);
    
    if (error.message.includes('API_KEY_INVALID')) {
      console.log('💡 Make sure your GOOGLE_API_KEY is valid and has access to Gemini API');
    } else if (error.message.includes('PERMISSION_DENIED')) {
      console.log('💡 Check if your API key has permission to use Gemini 2.0 Flash-Lite');
    }
  }
}

testGemini2FlashLite();
