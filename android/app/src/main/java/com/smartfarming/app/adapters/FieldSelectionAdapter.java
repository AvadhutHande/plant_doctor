package com.smartfarming.app.adapters;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.smartfarming.app.R;
import com.smartfarming.app.utils.FarmSessionManager;

import java.util.List;

public class FieldSelectionAdapter extends RecyclerView.Adapter<FieldSelectionAdapter.ViewHolder> {

    private final List<FarmSessionManager.Field> fields;
    private final String currentFieldId;
    private final OnFieldSelectedListener listener;

    public interface OnFieldSelectedListener {
        void onFieldSelected(FarmSessionManager.Field field);
    }

    public FieldSelectionAdapter(List<FarmSessionManager.Field> fields, String currentFieldId, OnFieldSelectedListener listener) {
        this.fields = fields;
        this.currentFieldId = currentFieldId;
        this.listener = listener;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.item_field_selection, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        FarmSessionManager.Field field = fields.get(position);
        
        holder.tvFieldName.setText(field.name);
        holder.tvFieldInitial.setText(field.name.substring(0, 1));
        
        // Mock logic for crop details (ideally pass this in)
        if (field.id.equals("F001")) {
            holder.tvFieldDetail.setText("Wheat • Vegetative");
        } else if (field.id.equals("F002")) {
            holder.tvFieldDetail.setText("Rice • Seedling");
        } else {
            holder.tvFieldDetail.setText("No Active Crop");
        }

        boolean isSelected = field.id.equals(currentFieldId);
        holder.ivSelectedCheck.setVisibility(isSelected ? View.VISIBLE : View.GONE);
        holder.itemView.setOnClickListener(v -> listener.onFieldSelected(field));
    }

    @Override
    public int getItemCount() {
        return fields.size();
    }

    static class ViewHolder extends RecyclerView.ViewHolder {
        final TextView tvFieldName;
        final TextView tvFieldDetail;
        final TextView tvFieldInitial;
        final ImageView ivSelectedCheck;

        ViewHolder(View view) {
            super(view);
            tvFieldName = view.findViewById(R.id.tvFieldName);
            tvFieldDetail = view.findViewById(R.id.tvFieldDetail);
            tvFieldInitial = view.findViewById(R.id.tvFieldInitial);
            ivSelectedCheck = view.findViewById(R.id.ivSelectedCheck);
        }
    }
}