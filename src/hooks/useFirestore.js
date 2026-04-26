import { 
  addDoc, 
  collection, 
  query, 
  where, 
  getDocs,
  orderBy 
} from 'firebase/firestore';
import { db } from '../firebase/config';

export const useFirestore = () => {
  // Save analysis to Firestore
  const saveAnalysis = async (userId, data) => {
    try {
      const docRef = await addDoc(collection(db, 'analyses'), {
        userId,
        type: data.type,
        inputs: data.inputs,
        result: data.result,
        feasibility: data.feasibility,
        createdAt: new Date(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error saving analysis:', error);
      throw error;
    }
  };

  // Get user's analyses
  const getAnalyses = async (userId) => {
    try {
      const q = query(
        collection(db, 'analyses'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const analyses = [];
      querySnapshot.forEach((doc) => {
        analyses.push({ id: doc.id, ...doc.data() });
      });
      return analyses;
    } catch (error) {
      console.error('Error getting analyses:', error);
      throw error;
    }
  };

  // Get suppliers with filters
  const getSuppliers = async (category, city) => {
    try {
      let q;
      
      if (category && city) {
        q = query(
          collection(db, 'suppliers'),
          where('category', '==', category),
          where('city', '==', city)
        );
      } else if (category) {
        q = query(
          collection(db, 'suppliers'),
          where('category', '==', category)
        );
      } else if (city) {
        q = query(
          collection(db, 'suppliers'),
          where('city', '==', city)
        );
      } else {
        q = query(collection(db, 'suppliers'));
      }

      const querySnapshot = await getDocs(q);
      const suppliers = [];
      querySnapshot.forEach((doc) => {
        suppliers.push({ id: doc.id, ...doc.data() });
      });
      return suppliers;
    } catch (error) {
      console.error('Error getting suppliers:', error);
      throw error;
    }
  };

  return {
    saveAnalysis,
    getAnalyses,
    getSuppliers,
  };
};
