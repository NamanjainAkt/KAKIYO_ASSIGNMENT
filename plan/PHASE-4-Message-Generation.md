# Phase 4: Message Generation & Chat

## Objective
Generate highly personalized outreach messages using the Offering, Prompt, and Unified Prospect Context. Provide a chat interface to handle follow-up replies natively.

## File Structure & Changes
- `db/schema.ts`: Add `messages` and `conversations` tables.
- `lib/ai/message-generator.ts`: Pipeline feeding Offering + Prompt + Context to Gemini 2.5 Flash.
- `lib/ai/reply-generator.ts`: Pipeline passing conversation history + Context to Gemini.
- `app/messages/page.tsx`: UI to select an offering, prompt, and prospect to generate a new message.
- `app/messages/actions.ts`: Server actions for generation.
- `components/chat/reply-interface.tsx`: Interactive chat UI for continuing the conversation.

## Task Breakdown
1. **Outreach Generation**: Build the core prompt pipeline that merges the 3 inputs to create the initial outreach message.
2. **Chat & Reply Engine**: Implement the history-aware reply generator.
3. **Message UI**: Allow user to copy, favorite, or regenerate messages.

## Verification
- Generated message visibly changes when a different Prompt or Offering is selected.
- Message references specific details from the Prospect Context.
- Follow-up replies maintain the persona and don't restart the conversation.
