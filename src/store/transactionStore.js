import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useTransactionStore = create(persist(
  (set, get) => ({
    transactions: [],
    filters: {
      month: 'all',
      type: 'all',
    },

    addTransaction: (transaction) =>
      set({ transactions: [{ ...transaction, id: Date.now(), date: new Date() }, ...get().transactions] }),

    deleteTransaction: (id) =>
      set({ transactions: get().transactions.filter(txn => txn.id !== id) }),

    editTransaction: (id, updatedTxn) =>
      set({
        transactions: get().transactions.map(txn =>
          txn.id === id ? { ...txn, ...updatedTxn } : txn
        )
      }),

    setFilters: (filters) =>
      set({ filters: { ...get().filters, ...filters } }),
  }),
  {
    name: "finance-transactions",
  }
));
